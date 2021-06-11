const express = require("express");
const session = require("express-session");

const {
    POST = 3000
} = process.env

const app = express();

app.listen(PORT, () => {
    console.log("Server hosted at: " + PORT)
})
