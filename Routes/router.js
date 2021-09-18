const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
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
    setDB.doc("test").set(studySet).then(() => {
        console.log("Test Worked!")
        res.send("Test Worked")
    })

    
})

module.exports = router;