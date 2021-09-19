const express = require("express");
const router = express.Router();
const admin = require('firebase-admin')
const db = admin.firestore();
const setDB = db.collection('StudySets');
const controller = require('../Controllers/controller.js');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
//*For Sets
router.post('/addSet', parseForm, csrfProtection, controller.addSet)

router.get('/readallSets', controller.readAllSets);

router.get('/readSetByName/:name', controller.readSetByName);

//*For Points
router.post('/setPoints', controller.setPoints);

router.get('/readPoints', controller.readPointsByEmail);


//*For Cookies
router.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});
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
  
  router.get("/home", parseForm, csrfProtection, function (req, res) {
    const sessionCookie = req.cookies.session || "";
  
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true)
      .then(() => {
        res.render("index.html", {csrfToken: req.csrfToken()});
      })
      .catch((error) => {
        res.redirect("/login");
      });
  });

  
router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
    var email = "";
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie("session", sessionCookie, options);
          //res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );

      // idToken comes from the client app
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log(uid);
            admin
            .auth()
            .getUser(uid)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                console.log("Email1: " + userRecord.toJSON().email);
                email = userRecord.toJSON().email;
                const expiresIn = 60 * 60 * 24 * 5 * 1000;
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie("userEmail", email, options);
                res.end(JSON.stringify({ status: "success" }));
              
               
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    
        })
        .catch((error) => {
        // Handle error
        });

        
  });

  
  router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.clearCookie("XSRF-TOKEN")
    res.clearCookie("userEmail");
    res.redirect("/login");
  });
  

module.exports = router;