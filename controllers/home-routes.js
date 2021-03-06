const router = require('express').Router();
const { User, Movies, Preference, Match } = require('../models')
//require users

router.get('/', async (req, res) => {
    res.render('homepage', {layout: "main.handlebars"})
});

router.get('/signup', async (req, res) => {
    res.render('signup', {layout: "main.handlebars"})
});

//Movie choice here
router.get('/signupmov', async (req, res) => {
    res.render('moviepreference', {layout: "main.handlebars"})
});

//Image upload here
router.get("/signupimg", async (req, res) => {
    res.render('image-upload', {layout: "main.handlebars"})
});

router.get('/dashboard', async (req, res) => {
    // if user.session, then allow them to access
    res.render('maindash', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user })
});

router.get('/settings', async (req, res) => {
    res.render('accountsettings', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user})
})

router.get('/updateprofile', async (req, res) => {
    console.log(req.session.user);
    res.render('updatebio', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user})
});

// renders the liked profiles
router.get('/profiles', async (req, res) => {
    res.render('partials/viewprofiles', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user, userData: req.session.data })
});

router.get('/quiz', async (req, res) => {
    res.render('quiz', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user })
});

router.get('/settings', async (req, res) => {
    res.render('quiz', {layout: "dashboard.handlebars", loggedIn: req.session.loggedIn, user: req.session.user })
});

// create route to render using a find method that returns the users gender preference
// create male and female methods first
//the rendered info is sent back to the front end view called "viewprofiles"


module.exports = router;