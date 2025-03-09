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
        const { firstName, lastName, username, password } = req.body;

        const newUser = await db.query(
            "INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4)",
            [firstName, lastName, username, password]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

})

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
})