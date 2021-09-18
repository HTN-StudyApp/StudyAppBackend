const express = require("express");
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const pointsDB = db.collection('UserPoints');




function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}


//*For Sets
exports.addSet = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.securityContextId;
    //console.log(`Your email is ${email}`);
    let studySet = {
        name: req.body.name,
        email: email,
        terms: req.body.terms,
        answers: req.body.answers
        
    }
    setDB.doc(email).collection("OwnedSets").doc(req.body.name).set(studySet).then(() => {
        console.log("Set Added!")
        
    })
    res.redirect('/');
}

exports.readAllSets = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.securityContextId;
    const snapshot = await setDB.where('email', '==', email).get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        // TODO return data somehow
    })
    res.redirect('/');

}

exports.readSetByName = async (req,res) => {
    //TODO parse only sets owned by user
    var cookies = parseCookies(req)
    const email = cookies.securityContextId;
    const snapshot = await setDB.where('email', '==', email).where('name', '==', req.params.name).get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        res.send(doc.id, '=>', doc.data());
    })
    res.redirect('/');
}
//*For Points
exports.setPoints = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.securityContextId;
    let points = {
        points: req.body.points,
        email: email
    }
    /*pointsDB.doc(email).set(points).then(() => {
        console.log(`${points.points} added to ${email}`);
        res.send(`${points.points} added to ${email}`);
    })*/
    setDB.doc(email).set(points).then(() => {
        console.log(`${req.body.points} points added`)
        
    })
    res.send(`${req.body.points} points added`);
}


exports.readPointsByEmail = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.securityContextId;
    const snapshot = await setDB.where('email', '==', email).get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.data().points.split('> ').pop());
        res.send(doc.data().points.split('> ').pop())
    })


}