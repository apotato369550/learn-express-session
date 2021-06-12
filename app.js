const express = require("express");
const session = require("express-session");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    POST = 3000,
    NODE_ENV = 'development',
    SESSION_LIFETIME = TWO_HOURS,
    SESSION_SECRET = "be quiet"
} = process.env

const IN_PROD = NODE_ENV === 'production';

const app = express();

app.use(session({
   name: SESS_NAME,
   resave: false,
   saveUninitialized: false,
   secret: SESSION_SECRET,
   cookie: {
       maxAge: SESSION_LIFETIME,
       sameSite: true,
       secure: IN_PROD
   } 
}))

app.get("/", () => {

})

app.get("/home", () => {
    
})

app.get("/login", () => {

})

app.get("/register", () => {
    
})

app.post("/login", () => {

})

app.post("/register", () => {
    
})

app.get("/logout", () => {
    
})
app.listen(PORT, () => {
    console.log("Server hosted at: " + PORT)
})
