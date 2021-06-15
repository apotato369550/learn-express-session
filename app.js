const express = require("express");
const session = require("express-session");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESSION_NAME = 'sid',
    SESSION_LIFETIME = TWO_HOURS,
    SESSION_SECRET = "be quiet"
} = process.env

const IN_PROD = NODE_ENV === 'production';

const app = express();

// test this
app.use(session({
   name: SESSION_NAME,
   resave: false,
   saveUninitialized: false,
   secret: SESSION_SECRET,
   cookie: {
       maxAge: SESSION_LIFETIME,
       sameSite: true,
       secure: IN_PROD
   } 
}))

app.get("/", (req, res) => {
    res.send(`
        <h1>Eyo Wassup</h1>
        <a href="/login">Login</a>
        <a href="/register">Register</a>

        <a href="/home">Home</a>
        <form method="post" action="/logout">
            <button></button>
        </form>
    `)
})

app.get("/home", (req, res) => {
    
})

app.get("/login", (req, res) => {

})

app.get("/register", (req, res) => {
    
})

app.post("/login", (req, res) => {

})

app.post("/register", (req, res) => {
    
})

app.get("/logout", (req, res) => {
    
})
app.listen(PORT, () => {
    console.log("Server hosted at: " + "http://localhost:" + PORT);
})
