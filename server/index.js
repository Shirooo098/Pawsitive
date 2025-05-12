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
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
};

// Initialize database pool
let db;
let server;

const initializeDatabase = async () => {
    try {
        db = new pg.Pool(dbConfig);
        
        // Test the connection
        const client = await db.connect();
        console.log('Database connection successful');
        client.release();

        // Add error handler for the pool
        db.on('error', (err) => {
            console.error('Unexpected database error:', err);
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
                console.log('Attempting to reconnect to database...');
                setTimeout(initializeDatabase, 5000);
            }
        });

        return true;
    } catch (err) {
        console.error('Failed to initialize database:', err);
        return false;
    }
};

// Configure allowed origins
const allowedOrigins = [
    'https://pawsitive-client-vert.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
];

// Enhanced CORS options
const corsOptions = {
    origin: function (origin, callback) {
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

// Middleware Setup
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads/'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security Headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Session Configuration
const sessionConfig = {
    store: new PgSession({
        conObject: {
            connectionString: process.env.POSTGRES_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000
        },
        tableName: 'user_sessions',
        createTableIfMissing: true,
        pruneSessionInterval: 60,
        errorLog: (err) => console.error('Session store error:', err)
    }),
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    },
    proxy: true,
    name: 'pawsitive.sid'
};

app.use(session(sessionConfig));

// Add error handling for session errors
app.use((req, res, next) => {
    if (!req.session) {
        return next(new Error('Session initialization failed'));
    }
    next();
});

// Move passport initialization after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Database Middleware - Add error handling
app.use(async (req, res, next) => {
    if (!db) {
        console.error('Database connection not initialized');
        return res.status(503).json({
            error: "Database connection not available",
            message: "Please try again in a few moments"
        });
    }

    try {
        const client = await db.connect();
        try {
            await client.query('SELECT 1');
            req.db = db;
            next();
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Database check failed:', err);
        if (!res.headersSent) {
            res.status(503).json({ 
                error: "Database temporarily unavailable",
                message: "Please try again in a few moments"
            });
        }
    }
});

// Routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes);

app.post("/register", async(req, res) => {
    try {

        console.log("Received in backend:", req.body);
        const { firstName, lastName, email, password } = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
            email
        ])

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

    // Check if database is connected
    if (!db) {
        return res.status(503).json({
            error: "Database connection not available",
            message: "Please try again in a few moments"
        });
    }

    passport.authenticate("local", (err, user, info) => {
        console.log("Passport authenticate callback:", { err, user, info });
        
        if (err) {
            console.error("Authentication error:", err);
            return res.status(500).json({ 
                error: "Authentication failed",
                message: "An internal error occurred during authentication"
            });
        } 
        
        if (!user) {
            console.log("Authentication failed:", info);
            return res.status(401).json({ 
                error: "Authentication failed",
                message: info.message || "Invalid credentials"
            });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error("Session login error:", loginErr);
                return res.status(500).json({ 
                    error: "Login failed",
                    message: "Failed to create session"
                });
            }

            console.log("User logged in successfully:", user.userid);
            return res.json({
                message: "Login successful",
                user: {
                    id: user.userid,
                    email: user.email,
                    role: user.type,
                    firstname: user.firstname,
                    lastname: user.lastname
                }
            });
        });
    })(req, res, next);
});

app.get("/appointment", (req, res) => {
    console.log("Checking authentication status:", req.isAuthenticated(), req.user);
    if(req.isAuthenticated()){
        return res.json({ 
            authenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
                firstname: req.user.firstname,
                lastname: req.user.lastname
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

app.post("/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.session.destroy((err) => {
            req.logout((err) => {
                if (err) {
                    console.error("Error logging out:", err);
                    return res.status(500).json({
                        error: "Logout failed",
                        message: "Failed to complete logout"
                    });
                }
                
                res.clearCookie('pawsitive.sid');
                res.json({ message: "Logout successful" });
            });
        });
    } else {
        res.json({ message: "Already logged out" });
    }
});
app.get("/auth/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
          authenticated: true,
          user: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
          },
        });
      } else {
        res.json({ authenticated: false });
      }
});

passport.use(
    new Strategy({ usernameField: "email"},async function verify(email, password, cb){
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

// Update passport serialization
passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, {
            id: user.userid,
            email: user.email,
            role: user.type,
            firstname: user.firstname,
            lastname: user.lastname
        });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server function
const startServer = async () => {
    try {
        const dbInitialized = await initializeDatabase();
        if (!dbInitialized) {
            console.error('Could not initialize database, retrying in 5 seconds...');
            setTimeout(startServer, 5000);
            return;
        }

        const port = process.env.PORT || 3000;
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        // Graceful shutdown
        const shutdown = async () => {
            console.log('Shutting down gracefully...');
            if (server) {
                server.close(() => {
                    console.log('HTTP server closed');
                });
            }
            if (db) {
                await db.end();
                console.log('Database pool closed');
            }
            process.exit(0);
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (err) {
        console.error('Server startup error:', err);
        process.exit(1);
    }
};

// Add health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Check database connection
        const client = await db.connect();
        await client.query('SELECT 1');
        client.release();
        
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(503).json({
            status: 'unhealthy',
            error: err.message
        });
    }
});

// Initialize server with error handling
const initializeServer = async () => {
    try {
        await startServer();
    } catch (err) {
        console.error('Critical error during server initialization:', err);
        process.exit(1);
    }
};

// Start server
initializeServer().catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
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