const express = require("express");
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const pointsDB = db.collection('UserPoints');


function extractCookieValue(cookieString, cookieName){

    var pos = cookieString.indexOf(cookieName + "=");
    var pos2 = cookieString.indexOf(";", pos);
    var value = "";
    //console.log("p1: " + pos + " p2: " + pos2 + " cookieString: " + cookieString);
    

    if(pos >= 0 && pos2 == -1){
        pos = pos + cookieName.length + 1;
        value = cookieString.substring(pos);
        //console.log("value: " + value);
    }
    else if(pos >= 0 && pos2 >= 0){
        pos = pos + cookieName.length + 1;
        value = cookieString.substring(pos,pos2);
        
        
    }
    return value;
}

//*For Sets
exports.addSet = async (req,res) => {
    var cookieString = req.headers.cookie;
    var email = extractCookieValue(cookieString, 'secuirtyContextId');
    let studySet = {
        name: req.body.name,
        email: email,
        terms: req.body.terms
        
    }
    setDB.doc(email).set(studySet).then(() => {
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