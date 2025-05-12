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
    max: 3,
    min: 0,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    application_name: 'pawsitive-app',
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
    statement_timeout: 15000,
    query_timeout: 10000
};

// Initialize database pool
let db;
try {
    console.log('Initializing database connection to:', 
        new URL(process.env.POSTGRES_URL).hostname);
    db = new pg.Pool(dbConfig);
    
    db.on('error', (err) => {
        console.error('Unexpected database error:', {
            code: err.code,
            message: err.message,
            fatal: err.fatal
        });
    });

    db.on('connect', (client) => {
        console.log('New database connection established');
        client.query('SET statement_timeout = 15000');
    });
} catch (err) {
    console.error('Failed to initialize database pool:', err);
    process.exit(1);
}

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
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    },
    proxy: true
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Database Middleware
app.use(async (req, res, next) => {
    try {
        const client = await db.connect();
        try {
            await client.query('SELECT 1');
            next();
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Database check failed:', err);
        res.status(503).json({ 
            error: "Database temporarily unavailable",
            message: "Please try again in a few moments"
        });
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
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(500).json({ error : "Server error"});
        if(!user) return res.status(401).json({ error : info.message});

        req.login(user, (err) => {
            if(err) return res.status(500).json({ error: "Login Failed" });
            return res.json({
                message: "Login Sucessful",
                user: {
                    id: user.id,
                    email: user.email
                }
            })
        })
    })(req, res, next);
})

app.get("/appointment", (req, res) => {
    if(req.isAuthenticated()){
        return res.json({ authenticated: true});
    }else{
        res.json({ authenticated: false});
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

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user);
})

// Error Handling
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

startServer();   

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