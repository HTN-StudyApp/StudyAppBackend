const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const controller = require('../Controllers/controller.js');

router.get('/', (req,res)=>{
    res.send("Hello World");
})

//*For Sets
router.post('/addSet',controller.addSet)

router.get('/readallSets', controller.readAllSets);

router.get('/readSetByName/:name', controller.readSetByName);

//*For Points
router.post('/addPoints', controller.addPoints);


module.exports = router;