import express from "express";

const app = express();
const port = 3000;

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
});

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
})