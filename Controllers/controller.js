const express = require("express");
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

exports.readAllSets = async (req,res) => {
    const snapshot = await setDB.get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        res.send(doc.data());
    })

}

exports.readSetByName = async (req,res) => {
    //TODO parse only sets owned by user
    const snapshot = await setDB.where('name', '==', req.params.name).get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        res.send(doc.id, '=>', doc.data());
    })
  
    
}
