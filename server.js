// Set Up
const express = require("express");
const app = express();
const routes = require("./routes")
const PORT = 3000;
const sequelize = require("./config/sequelize");
// Configuration
app.use(express.json())

// Routes
app.use('/', routes)

// Listen (Start app)
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log("Express App listening at http://localhost:" + PORT);
    })
})
