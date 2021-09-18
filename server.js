const express = require('express');
const bodyParser = require('body-parser');
const fs = require('firebase-admin')
const serviceAccount = require('./creds/serviceKey.json')

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

const routes = require('./Routes/router.js'); // Imports routes for the products
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());




app.use('/', routes);
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`[+] Server started on ${port}`)
})