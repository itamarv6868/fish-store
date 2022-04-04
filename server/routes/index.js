var express = require('express');
var router = express.Router();
const { login } = require("../controllers/index.controller")
const passport = require('../middleware/passport')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', { session: false, failureRedirect: '/err', }), login);
router.get('/err', (req, res) => { res.status(401).send('Not autorized') });
router.get('/user', (req, res) => { res.status(200).send('autorized') });

module.exports = router;