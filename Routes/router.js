const express = require("express");
const router = express.Router();
const fs = require('firebase-admin')
const db = fs.firestore();
const setDB = db.collection('StudySets');
const controller = require('../Controllers/controller.js');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
//*For Sets
router.post('/addSet',controller.addSet)

router.get('/readallSets', controller.readAllSets);

router.get('/readSetByName/:name', controller.readSetByName);

//*For Points
router.post('/setPoints', controller.setPoints);

router.get('/readPoints', controller.readPointsByEmail);


//*For Cookies
router.get('/getcookies',(req,res) => {
    res.send(req.headers.cookie + "Hello");
})


router.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });
  
  router.get("/login", function (req, res) {
    res.render("login.html");
  });
  
  router.get("/signup", function (req, res) {
    res.render("signup.html");
  });
  
  router.get("/profile", function (req, res) {
    const sessionCookie = req.cookies.session || "";
  
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then(() => {
        res.render("profile.html");
      })
      .catch((error) => {
        res.redirect("/login");
      });
  });

  
router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
  
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
  });
  
  router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
  });
  

module.exports = router;