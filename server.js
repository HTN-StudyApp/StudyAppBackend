const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require('./Creds/serviceKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const db = admin.firestore(); 

const routes = require('./Routes/router.js'); // Imports routes for the products
const app = express();

app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfProtection);



app.use('/', routes);
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`[+] Server started on ${port}`)
})