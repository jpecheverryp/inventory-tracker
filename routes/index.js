const express = require("express");
const router = express.Router();

const userRoutes = require("./users")

router.use("/users", userRoutes)

router.get('/', (req, res) => {
    res.send("hello world")
})



module.exports = router