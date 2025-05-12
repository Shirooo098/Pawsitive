import express from "express";
import pg from 'pg';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js'
import pgSession from 'connect-pg-simple';

const app = express();
const port = process.env.PORT || 8080;
const saltRounds = 10;
const PgSession = pgSession(session);

const client = process.env.FRONTEND_URL;

// const db_user = process.env.POSTGRE_DB_USER;
// const db_host = process.env.POSTGRE_HOST;
// const db_name = process.env.POSTGRE_DB_NAME;
// const db_password = process.env.POSTGRE_DB_PASSWORD;
// const db_port = process.env.POSTGRE_DB_PORT;

// const db_user = process.env.POSTGRE_USER;
// const db_host = process.env.POSTGRE_HOST;
// const db_name = process.env.POSTGRE_DATABASE;
// const db_password = process.env.POSTGRE_PASSWORD;
// const db_port = process.env.POSTGRE_PORT;
const session_secret = process.env.COOKIE_SESSION_SECRET;

const dbConfig = {
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : false,
  max: 3, 
  min: 0,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  application_name: 'pawsitive-app',
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  statement_timeout: 10000,
  query_timeout: 5000,
  connectionRetryTimeout: 30000,
  connectionTimeoutMillis: 5000
};

console.log('Initializing database pool with config:', {
  ...dbConfig,
  connectionString: dbConfig.connectionString ? 
    dbConfig.connectionString.replace(/:[^:]*@/, ':****@') : 'undefined'
});

let db = new pg.Pool(dbConfig);

let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_BASE_DELAY = 1000;
let isReconnecting = false;

const monitorConnection = async () => {
  if (isReconnecting) return;
  
  try {
    const client = await Promise.race([
      db.connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      )
    ]);

    try {
      await client.query('SELECT 1');
      isConnected = true;
      reconnectAttempts = 0;
      console.log('Database connection healthy');
    } catch (err) {
      isConnected = false;
      console.error('Query failed in health check:', err.message);
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    isConnected = false;
    console.error('Connection health check failed:', {
      code: err.code,
      message: err.message
    });

    if (!isReconnecting) {
      reconnectWithRetry();
    }
  }
};

const reconnectWithRetry = async () => {
  if (isReconnecting) return;
  isReconnecting = true;

  try {
    while (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      const delay = Math.min(
        RECONNECT_BASE_DELAY * Math.pow(1.5, reconnectAttempts - 1),
        30000
      );

      console.log(`Reconnection attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}, waiting ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));

      try {
        await db.end();
        
        db = new pg.Pool(dbConfig);

        const client = await db.connect();
        await client.query('SELECT 1');
        client.release();
        
        isConnected = true;
        console.log('Database reconnected successfully');
        break;
      } catch (err) {
        console.error('Reconnection attempt failed:', {
          attempt: reconnectAttempts,
          code: err.code,
          message: err.message
        });
        
        if (reconnectAttempts === MAX_RECONNECT_ATTEMPTS) {
          console.error('Max reconnection attempts reached');
          throw err;
        }
      }
    }
  } finally {
    isReconnecting = false;
  }
};

// Event Listeners
db.on('error', (err) => {
  console.error('Database pool error:', {
    code: err.code,
    message: err.message
  });
  
  if (!isReconnecting && (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED')) {
    isConnected = false;
    reconnectWithRetry();
  }
});

db.on('connect', () => {
  isConnected = true;
  reconnectAttempts = 0;
  console.log('Database connection established');
});

// More frequent health checks in production
const HEALTH_CHECK_INTERVAL = process.env.NODE_ENV === 'production' ? 15000 : 30000;
setInterval(monitorConnection, HEALTH_CHECK_INTERVAL);

// Initial Connection Verification with Timeout
const verifyInitialConnection = async () => {
  console.log('Verifying initial database connection...');
  
  return Promise.race([
    monitorConnection(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Initial connection timeout')), 30000)
    )
  ]);
};

// Database Middleware with Enhanced Error Handling
app.use(async (req, res, next) => {
  if (!isConnected) {
    console.log('Database not connected, attempting to reconnect...');
    try {
      await reconnectWithRetry();
      if (!isConnected) {
        return res.status(503).json({
          error: "Database unavailable",
          message: "Service is temporarily unavailable, please try again in a few moments",
          retryAfter: 30
        });
      }
    } catch (err) {
      console.error('Reconnection in middleware failed:', err);
      return res.status(503).json({
        error: "Database connection failed",
        message: "Service is temporarily unavailable, please try again later",
        retryAfter: 60
      });
    }
  }

  // Attach enhanced query retry wrapper
  req.queryWithRetry = async (text, params, maxRetries = 3) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await Promise.race([
          db.query(text, params),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Query timeout')), 5000)
          )
        ]);
        return result;
      } catch (err) {
        lastError = err;
        if (err.code === 'ECONNRESET' || err.message.includes('timeout')) {
          console.log(`Query failed (attempt ${i + 1}/${maxRetries}), retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        throw err;
      }
    }
    throw lastError;
  };

  next();
});

// CORS Debug Middleware (before CORS configuration)
app.use((req, res, next) => {
  console.log('Incoming request:', {
    origin: req.headers.origin,
    method: req.method,
    path: req.path,
    headers: {
      'access-control-request-method': req.headers['access-control-request-method'],
      'access-control-request-headers': req.headers['access-control-request-headers'],
      'origin': req.headers.origin
    }
  });
  next();
});

// CORS Configuration
const allowedOrigins = [
  'https://pawsitive-client-vert.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin not allowed by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  // Ensure CORS headers are set even if the request fails
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin || allowedOrigins[0]);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Error handler specifically for CORS errors
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    console.error('CORS Error:', {
      origin: req.headers.origin,
      method: req.method,
      path: req.path
    });
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origin not allowed',
      allowedOrigins
    });
  }
  next(err);
});

// Middleware
app.use('/uploads', express.static('uploads/'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment Validation
if (!process.env.COOKIE_SESSION_SECRET || !process.env.POSTGRES_URL) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Session Configuration
app.use(session({
  store: new PgSession({
    pool: db,
    tableName: 'user_sessions',
    pruneSessionInterval: 86400,
    createTableIfMissing: true,
    errorLog: console.error
  }),
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.railway.app' : undefined
  },
  proxy: true,
  name: 'pawsitive.sid' // Custom session cookie name
}));

// Routes and other middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', adminRoutes);
app.use('/', userRoutes);

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server only after verifying connection
const startServer = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await verifyInitialConnection();
      
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Database connection status: ${isConnected ? 'connected' : 'disconnected'}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use`);
          server.close();
          if (i === retries - 1) {
            console.error('Max retries reached. Exiting...');
            process.exit(1);
          }
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      });

      return server;
    } catch (err) {
      console.error(`Attempt ${i + 1}/${retries} failed:`, err);
      if (i === retries - 1) {
        console.error('Failed to start server after multiple attempts');
        process.exit(1);
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Start the server
startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Error Handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please try the following:
    1. Stop any other servers running on port ${port}
    2. Wait a few seconds and try again
    3. Or use a different port by setting the PORT environment variable`);
  }
  process.exit(1);
});

app.use(cors({
    origin: client,
    credentials: true
}));

app.use('/uploads', express.static('uploads/'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

if (!process.env.COOKIE_SESSION_SECRET || !process.env.POSTGRES_URL) {
    console.error('Missing required environment variables');
    process.exit(1);
}

app.use(session({
    store: new PgSession({
        pool: db, 
        tableName: 'user_sessions',
        pruneSessionInterval: 86400
    }),
    secret: session_secret,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none' 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(async (req, res, next) => {
    if (!isConnected) {
        console.log('Database disconnected, attempting to reconnect...');
        try {
            await verifyConnection(2, 2000);
        } catch (err) {
            console.error('Failed to reconnect in middleware:', err);
            return res.status(503).json({ 
                error: "Database temporarily unavailable",
                message: "Server is attempting to restore connection. Please try again in a few moments.",
                retry_after: 30
            });
        }
    }

    try {
        const client = await Promise.race([
            db.connect(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Connection timeout')), 5000)
            )
        ]);

        try {
            await client.query('SELECT 1');
            client.release();
            next();
        } catch (queryErr) {
            client.release();
            throw queryErr;
        }
    } catch (err) {
        console.error('Database operation failed:', {
            code: err.code,
            message: err.message,
            detail: err.detail
        });

        if (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED' || err.message.includes('timeout')) {
            isConnected = false;
            return res.status(503).json({ 
                error: "Database temporarily unavailable",
                message: "Connection lost, attempting to restore. Please try again in a few moments.",
                retry_after: 30
            });
        } else {
            return res.status(500).json({ 
                error: "Database error",
                message: "An unexpected database error occurred. Please try again later."
            });
        }
    }
});

app.use('/admin', adminRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.json({  message: 'Backend is running' });
  });

app.post("/register", async(req, res) => {
    try {

        console.log("Received in backend:", req.body);
        const { firstName, lastName, email, password } = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        )

        if(checkUser.rows.length > 0 ){
            res.json({ message: "Email already exists. Try logging in."})
        }else {     
            passwordHashing(res, firstName, lastName, email, password, saltRounds)
        }
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/login", (req, res, next) => {
    console.log("Login Request:", req.body); 
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(500).json({ error : "Server error"});
        if(!user) return res.status(401).json({ error : info.message});

        req.login(user, (err) => {
            if(err) return res.status(500).json({ error: "Login Failed" });
            console.log('Authenticated user:', req.user);
            return res.json({
                message: "Login Sucessful",
                user: {
                    id: user.userID,
                    email: user.email,
                    type: user.type
                }
            })
        })
    })(req, res, next);
})

app.get("/auth/check", (req, res) => {
    console.log("User from session:", req.user);
    if (req.isAuthenticated()) {
        res.json({
          authenticated: true,
          user: {
            id: req.user.userID,
            email: req.user.email,
            firstName: req.user.firstname,
            lastName: req.user.lastname,
            type: req.user.type
          },
        });
      } else {
        res.json({ authenticated: false });
      }
});

app.get('/logout', (req, res) => {
    console.log("Logout CLicked")
    req.logout((err) => {
        if(err) return res.status(500).json({ error: "Logout Failed"});
        
        req.session.destroy((err => {
            if (err) return res.status(500).json({ error: "Session destroy Failed"});

            res.clearCookie('connect.sid');
            console.log("Logged Out Successfully");
            res.json({ message: 'Logged Out Successfully'});
        }))
    })
})

passport.use(
    new Strategy({ usernameField: "email"}, async function verify(email, password, cb){
        console.log(email);

        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [
                email
            ]);

            if(result.rows.length > 0){
                console.log(result.rows);
                const user = result.rows[0];
                const storedHashedPassword = user.password;

                bcrypt.compare(password, storedHashedPassword, (err, result) => {
                    if(err) return cb(err);

                    if(result){
                        console.log("Login Success, Email:", user.email);
                        return cb(null, user);
                    } else {
                        return cb(null, false, { message: "Incorrect Password "});
                    }
                })
            }else{
                return cb(null, false, "User not found");
            }
        } catch (error) {
           console.error("Login Error:", error);
           return cb(error);
        }
}))

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user);
})

// Add health check endpoint
app.get('/health', async (req, res) => {
    try {
        if (!isConnected) {
            return res.status(503).json({
                status: 'error',
                message: 'Database disconnected',
                connected: false
            });
        }

        const client = await Promise.race([
            db.connect(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Health check timeout')), 5000)
            )
        ]);

        try {
            await client.query('SELECT 1');
            client.release();
            res.json({
                status: 'healthy',
                message: 'Service is healthy',
                connected: true
            });
        } catch (err) {
            client.release();
            throw err;
        }
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(503).json({
            status: 'error',
            message: 'Database health check failed',
            connected: false
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});

const passwordHashing = (
        res, 
        firstName, 
        lastName, 
        email,
        password,
        saltRounds
    ) => {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if(err){
                console.error("Error Hashing password:", err);
            }else{
                console.log("Hashed Password:", hash);
                const newUser = await db.query(
                    "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4)",
                    [firstName, lastName, email, hash]
                );
                res.json(newUser.rows[0]);
            }
    });
}   