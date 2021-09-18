const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const controller = require('../Controllers/controller.js');

router.get('/', (req,res)=>{
    res.send("Hello World");
})

router.post('/addSet',controller.addSet)

router.get('/readallSets', controller.readAllSets)



module.exports = router;