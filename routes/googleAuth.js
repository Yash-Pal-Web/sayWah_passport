const express = require('express');
let router = express();
const expressSession=require("express-session");
const MemoryStore = require('memorystore')(expressSession)

//const bcryptjs = require('bcryptjs');
const passport = require('passport');
//const googleAuth = require("./controllers/googleAuth");



require('../controllers/googleAuth')(passport);
require('../controllers/passportLocal')(passport);


router.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

router.use(passport.initialize());
router.use(passport.session());

// function checkAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
//         next();
//     } else {
//         req.flash('error_messages', "Please Login to continue !");
//         res.redirect('/login');
//     }
// }

// router.get('/', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render("index", { logged: true });
//     } else {
//         res.render("index", { logged: false });
//     }
// });





// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         failureRedirect: '/login',
//         successRedirect: '/profile',
//         failureFlash: true,
//     })(req, res, next);
// });

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy(function (err) {
//         res.redirect('/');
//     });
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.use('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    console.log("google call back----------->");

    console.log("session--->",req.session,req.body)
   res.redirect('https://www.google.com');
});



//router.use(userRoutes);

module.exports = router;