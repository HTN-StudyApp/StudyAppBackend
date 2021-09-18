const express = require("express");
const router = express.Router();
const fs = require('firestore-admin');
const db = fs.firestore();
const setDB = db.collection('StudySets');

router.get('/', (req,res)=>{
    res.send("Hello World");
})

router.post('/testData', (req,res)=>{
    let studySet = {
        name: "Helloooooo",
        terms: ["asdasd", "asdasdasdasd", "asdasdasdasd"]
    }
})

module.exports = router;