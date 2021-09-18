const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const controller = require('../Controllers/controller.js');
const cookieParser = require('cookie-parser');



//*For Sets
router.post('/addSet',controller.addSet)

router.get('/readallSets', controller.readAllSets);

router.get('/readSetByName/:name', controller.readSetByName);

//*For Points
router.post('/setPoints', controller.setPoints);

router.get('/readPoints', controller.readPointsByEmail);

//*Testing EJS
router.get('/', (req,res) => {
    res.render('index');
})

//*For Cookies
router.get('/getcookies',(req,res) => {
    res.send(req.headers.cookie + "Hello");
})

module.exports = router;