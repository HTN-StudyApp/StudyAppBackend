const express = require("express");
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const pointsDB = db.collection('UserPoints');


//*For Sets
exports.addSet = async (req,res) => {
    let studySet = {
        name: req.body.name,
        terms: req.body.terms
        //TODO add email parameter
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
//*For Points
exports.addPoints = async (req,res) => {
    //TODO get email from cookie
    let points = {
        points: req.body.points
    }
    pointsDB.doc("eligfinkel@gmail.com").set(points).then(() => {
        console.log(`${points.points} added to eligfinkel@gmail.com`);
        res.send(`${points.points} added to eligfinkel@gmail.com`);
    })
}