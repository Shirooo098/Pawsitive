import express from "express";
import pg from 'pg';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const db_user = process.env.POSTGRE_DB_USER;
const db_host = process.env.POSTGRE_HOST;
const db_name = process.env.POSTGRE_DB_NAME;
const db_password = process.env.POSTGRE_DB_PASSWORD;
const db_port = process.env.POSTGRE_DB_PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

const db = new pg.Client({
    user: db_user,
    host: db_host,
    database: db_name, 
    password: db_password,
    port: db_port
})

db.connect();

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
            const newUser = await db.query(
                "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4)",
                [firstName, lastName, email, password]
            );
            res.json(newUser.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if(result.rows.length > 0){
            console.log(result.rows);
            const user = result.rows[0];
            const storedPassword = user.password;

            if(password !== storedPassword){
                console.log("Incorrect Email or Password");
                return res.status(401).json({ error: "Incorrect email or password "});
            }

            console.log("Login Success, Email: ", user.email)

            res.json({ message: "Login Successful", 
                user:
                    {
                        id: user.id,
                        email: user.email
                    }
                });
        }else{
            return res.status(401).json({ error : "Email not found"});
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(401).json({ error: "Unexpected error occurred"})
    }
});

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
})