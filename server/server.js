import express from "express";
import pg from 'pg';
import 'dotenv/config';

const app = express();
const port = 3000;
const db_user = process.env.POSTGRE_DB_USER;
const db_host = process.env.POSTGRE_HOST;
const db_name = process.env.POSTGRE_DB_NAME;
const db_password = process.env.POSTGRE_DB_PASSWORD;
const db_port = process.env.POSTGRE_DB_PORT;

const db = new pg.Client({
    user: db_user,
    host: db_host,
    database: db_name, 
    password: db_password,
    port: db_port
})

db.connect();

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
});

app.post("/register", (req, res) => {

})

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
})