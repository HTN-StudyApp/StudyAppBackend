const express = require('express');
const bodyParser = require('body-parser');
const fs = require('firebase-admin')
const serviceAccount = require('./Creds/serviceKey.json')
const path = require('path');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

const routes = require('./Routes/router.js'); // Imports routes for the products
const app = express();

app.set('Views', path.join(__dirname, 'views/ejs'));
app.set('view engine', 'ejs');


app.use('/static', express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());




app.use('/', routes);
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`[+] Server started on ${port}`)
})