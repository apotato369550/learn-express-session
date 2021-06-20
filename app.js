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

// create users array variable here
// do this tomorrow
// wire to database
// hash passwords
const users = [
    { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret'},
    { id: 2, name: 'Max', email: 'max@gmail.com', password: 'secret'},
    { id: 3, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret'}
]

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
        res.redirect("/home");
    } else {
        next();
    }
}

app.use((req, res, next) => {
    const { userId } = req.session
    if(userId){
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})

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
    // forgot to add home here lol
    // get home
    // test login as well
    // there is no logout button
    // continue watching youtube video
    const { user } = res.locals
    res.send(`
        <h1>Home</h1>
        <a href="/">Main</a>

        <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.name}</li>
        </ul>
    `);
})

app.get("/profile", redirectLogin, (req, res) => {
    const { user } = res.locals
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
    const { email, password } = req.body;

    if(email && password){
        const user = users.find(
            user => user.email === email && user.password === pasword
        )

        if(user){
            req.session.userId = user.id;
        }
    }

    res.redirect('/login')
})

app.post("/register", redirectHome, (req, res) => {
    const {name, email, password} = req.body;

    if(name && email && password){
        const exists = users.some(
            user => user.email === email
        )

        if(!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }

            users.push(user);
            req.session.userId = user.id;
            return res.redirect("/home");
        }
    }
    // continue here
    // almost throughj
    res.redirect("/register");
})
// run and test if smooth
app.get("/logout", redirectLogin, (req, res) => {
    res.session.destroy(err => {
        if(err){
            return res.redirect("/home");
        }
        
        res.clearCookie(SESSION_NAME);
        res.redirect("/login")
    })

})
app.listen(PORT, () => {
    console.log("Server hosted at: " + "http://localhost:" + PORT);
})
