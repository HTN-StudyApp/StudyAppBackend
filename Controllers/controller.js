const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');

exports.addSet = async (req,res) => {
    let studySet = {
        name: req.body.name,
        terms: req.body.terms
    }
    setDB.doc(req.body.name).set(studySet).then(() => {
        console.log("Set Added!")
        res.send("Set Added")
    })
}

exports.readAllSets = async (req,res) =>{
    const snapshot = await setDB.get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    })
    res.redirect('/');
}