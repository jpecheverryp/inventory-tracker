// Set Up
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { User } = require("../../models");
const {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken
} = require("../../utils/auth")

let refreshTokens = []

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

// Create token
router.post('/token', (req, res) => {
    console.log('here');
    const refreshToken = req.body.token
    console.log(refreshToken);
    // Checks if refresh token was sent
    if(refreshToken == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({userId: user.userId})
        res.json({accessToken: accessToken})
    })
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
        const userPayload = {
            userId: user.id
        }
        console.log(userPayload);
        const accessToken = generateAccessToken(userPayload)
        const refreshToken = generateRefreshToken(userPayload)
        refreshTokens.push(refreshToken);
        res.status(200)
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })

    } catch (error) {
        console.log(error);
        res.status(500)
        res.send('Error in server')
    }
})

router.get('/userData', authenticateToken, async (req, res) => {
    const userData = await User.findByPk(req.user.userId)
    res.status(200)
    res.json(req.user)
    // res.json(userData)
})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
})

module.exports = router