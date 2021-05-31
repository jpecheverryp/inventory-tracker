const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json())

const users = [
    {
        username: "John",
        password: "password1"
    },
    {
        username: "Kelly",
        password: "password2"
    },
    {
        username: "Pablo",
        password: "password3"
    }
]

app.get('/', (req, res) => {
    res.send("hello world")
})
app.get('/users', (req, res) => {
    res.status(200)
    res.json(users)
})
app.post('/users', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }
    users.push(newUser)
    res.status(200)
    res.json({message: "User created"})
})

app.listen(PORT, () => {
  console.log("Express App listening at http://localhost:" + PORT);  
})