const express = require("express");
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const pointsDB = db.collection('UserPoints');


//!NOT GOING TO WORK WITH BACKEND AUTH!!! MADE FOR COOKIES

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
    const email = cookies.userEmail;
    var csrfToken = cookies.XSRF-TOKEN;
    console.log(`Email is for ${email}`)
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
    const email = cookies.userEmail;
    let sets = [];
    let snapshot = await setDB.doc(email).collection('OwnedSets').get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        sets.push(doc.data())
    })
    res.send(sets)
}

exports.readSetByName = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.userEmail;
    const snapshot = await setDB.doc(email).collection('OwnedSets').where('name', '==', req.params.name).get();
    if(snapshot.empty){
        console.log('No mathcing documents.');
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        res.send(doc.data());
    })
  
}
//*For Points
exports.setPoints = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.userEmail;
    let points = {
        points: req.body.points,
        email: email
    }
    setDB.doc(email).set(points).then(() => {
        console.log(`${req.body.points} points added`)
        
    })
    res.send(`${req.body.points} points added`);
}


exports.readPointsByEmail = async (req,res) => {
    var cookies = parseCookies(req)
    const email = cookies.userEmail;
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