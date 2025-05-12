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
// Railway automatically assigns PORT, default to 3001 locally to avoid conflicts
const PORT = process.env.PORT || 3001;
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

// Enhanced port handling with async port finding
const findAvailablePort = async (startPort) => {
    const net = await import('net');
    
    const isPortAvailable = (port) => {
        return new Promise((resolve) => {
            const server = net.createServer();
            server.once('error', () => {
                server.close();
                resolve(false);
            });
            
            server.once('listening', () => {
                server.close();
                resolve(true);
            });
            
            server.listen(port);
        });
    };

    let currentPort = startPort;
    while (currentPort < startPort + 100) { // Try up to 100 ports
        if (await isPortAvailable(currentPort)) {
            return currentPort;
        }
        currentPort++;
    }
    throw new Error('No available ports found');
};

// Enhanced server start function
const startServer = () => {
    try {
        // Enable IPv6 support
        const server = app.listen(PORT, '::', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('IPv6 binding enabled');
        });

        // Add keep-alive configuration
        server.keepAliveTimeout = 65000; // Slightly higher than ALB's idle timeout
        server.headersTimeout = 66000; // Slightly higher than keepAliveTimeout

        // Handle server errors
        server.on('error', (err) => {
            console.error('Server error:', err);
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is in use`);
            }
            process.exit(1);
        });

        // Graceful shutdown
        const shutdown = async () => {
            console.log('Shutting down gracefully...');
            server.close(async () => {
                console.log('HTTP server closed');
                try {
                    await db.end();
                    console.log('Database connections closed');
                    process.exit(0);
                } catch (err) {
                    console.error('Error closing database', err);
                    process.exit(1);
                }
            });

            // Force shutdown after 30 seconds
            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 30000);
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

        return server;
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

// Initialize server with error handling
const initializeServer = async () => {
    try {
        await startServer();
    } catch (err) {
        console.error('Critical error during server initialization:', err);
        process.exit(1);
    }
};

// Database Configuration
const dbConfig = {
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? { 
        rejectUnauthorized: false,
        sslmode: 'require'
    } : false,
    max: 3, // Reduced pool size for Railway's limitations
    min: 0,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    application_name: 'pawsitive-app',
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
    statement_timeout: 15000,
    query_timeout: 10000,
    // Railway specific settings
    pool: {
        min: 0,
        max: 3,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200
    }
};

// Enhanced connection verification
const verifyConnection = async () => {
    try {
        const client = await db.connect();
        try {
            await client.query('SELECT NOW()');
            console.log('Database connection verified successfully');
            return true;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Database connection verification failed:', {
            code: err.code,
            message: err.message,
            host: new URL(process.env.POSTGRES_URL).hostname
        });
        return false;
    }
};

// Initialize database pool with verification
let db;
try {
    console.log('Initializing database connection to:', 
        new URL(process.env.POSTGRES_URL).hostname);
    db = new pg.Pool(dbConfig);
    
    // Add error handler
    db.on('error', (err) => {
        console.error('Unexpected database error:', {
            code: err.code,
            message: err.message,
            fatal: err.fatal
        });
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was lost');
        }
    });

    // Add connect handler
    db.on('connect', (client) => {
        console.log('New database connection established');
        client.query('SET statement_timeout = 15000');
    });

} catch (err) {
    console.error('Failed to initialize database pool:', err);
    process.exit(1);
}

// Verify initial connection
verifyConnection().then(isConnected => {
    if (!isConnected) {
        console.error('Initial database connection verification failed');
        process.exit(1);
    }
});

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

// Add security headers
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// CORS Configuration with specific origins
// Configure allowed origins
const allowedOrigins = [
  'https://pawsitive-client-vert.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

// Enhanced CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
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
        createTableIfMissing: true,
        pruneSessionInterval: 60
    }),
    secret: process.env.COOKIE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true
    },
    proxy: true
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

// Replace the old server start code with the new initialization
initializeServer();

// Error Handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Give time for any cleanup
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});


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