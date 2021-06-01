// Set Up
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({});
        res.status(200);
        res.json(userData)
    } catch (error) {
        res.status(500);
        res.send(error);
    }
})
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(200)
        res.json(newUser)
    } catch (err) {
        res.status(500)
        res.json(err)
    }

})

router.post('/login', async ({ body }, res) => {
    // Check if email and password are both in the body
    if (!body.email || !body.password) {
        res.status(400)
        res.json({ message: "Email and Password are Required" })
        return
    }
    try {
        // Find specific user by email
        const user = await User.findOne({
            where: {
                email: body.email
            }
        })
        // If user does not exist in database return 400
        if (user == null) {
            return res.status(400).json({ message: "User Not Found" })
        }
        // If password does not match return 401
        if (!(await bcrypt.compare(body.password, user.password))) {
            return res.status(401).json({ message: "Not Allowed" })
        }
        // If user passes every check authenticate
        res.status(200)
        res.json({ message: "User Logged In" })

    } catch (error) {
        console.log(error);
        res.status(400)
        res.send(error)
    }
})

module.exports = router