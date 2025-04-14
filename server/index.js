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
const port = process.env.PORT;
const saltRounds = 10;
const PgSession = pgSession(session);

const client = process.env.FRONTEND_URL;

// const db_user = process.env.POSTGRE_DB_USER;
// const db_host = process.env.POSTGRE_HOST;
// const db_name = process.env.POSTGRE_DB_NAME;
// const db_password = process.env.POSTGRE_DB_PASSWORD;
// const db_port = process.env.POSTGRE_DB_PORT;

const db_user = process.env.POSTGRE_USER;
const db_host = process.env.POSTGRE_HOST;
const db_name = process.env.POSTGRE_DATABASE;
const db_password = process.env.POSTGRE_PASSWORD;
const db_port = process.env.POSTGRE_DB_PORT;
const session_secret = process.env.COOKIE_SESSION_SECRET;

const db = new pg.Client({
    // user: db_user,
    // host: db_host,
    // database: db_name, 
    // password: db_password,
    // port: db_port

    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

app.use(cors({
    origin: client,
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

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
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());


db.connect();

app.use((req, res, next) => {
    req.db = db;
    next();
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