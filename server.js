const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const PORT = 3000;

app.use(express.json())

const users = []

app.get('/', (req, res) => {
    res.send("hello world")
})
app.get('/users', (req, res) => {
    res.status(200)
    res.json(users)
})
app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        }
        users.push(newUser)
        res.status(200)
        res.json({ message: "User created" })
    } catch (err) {
        res.status(500)
        res.json(err)
    }

})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if (user == null) {
        return res.status(400).json({ message: "User Not Found" })
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.status(200)
            res.json({message: "User Logged In"})
        } else {
            res.status(401)
            res.json({message: "Not Allowed"})
        }
    } catch (err) {
        res.status(500)
        res.json(err)
    }
})

app.listen(PORT, () => {
    console.log("Express App listening at http://localhost:" + PORT);
})