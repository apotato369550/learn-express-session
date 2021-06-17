const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({
    extended: true
}))

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

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        res.redirect("/login");
    } else {
        next();
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect("/login");
    } else {
        next();
    }
}

app.get("/", (req, res) => {
    const { userId } = req.session;

    // edit thisVVV
    // do this tomorrow when ur brain can understand
    // test this mf

    res.send(`
        <h1>Welcome!</h1>
        ${userId ? `
            <a href='/home'>Home</a>
            <form method="post" action="/logout">
                <button>Logout</button>
            </form>
        ` : `
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        `}
    `)
})

app.get("/home", redirectLogin, (req, res) => {
    res.send(`
        <h1>Home</h1>
        <a href="/">Main</a>

        <ul>
            <li>Name: </li>
            <li>Email: </li>
        </ul>
    `);
})

app.get("/login", (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Submit</button>
        </form>
        <a href="/register">Register</a>
    `);
})

app.get("/register", (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="POST" action="/register">
            <input name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Submit</button>
        </form>
        <a href="/login">Login</a>
    `);
})

app.post("/login", redirectHome, (req, res) => {

})

app.post("/register", redirectHome, (req, res) => {
    
})

app.get("/logout", redirectLogin, (req, res) => {
    
})
app.listen(PORT, () => {
    console.log("Server hosted at: " + "http://localhost:" + PORT);
})
