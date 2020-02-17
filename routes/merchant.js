var passport = require('passport');
require('../config/passport')(passport);
var base64 = require('base-64');
var express = require('express');
var router = express.Router();

var signup = require('./signup');
var signin = require('./signin');
var dashboard = require('./dashboard');
var store = require('./store');
var cashback = require('./cashback');
var milestone = require('./milestone');
var survey = require('./survey');
var customerBill = require('./customerbills');

router.post('/signup', signup.postSignup);
router.post('/signin', signin.postSignin);
router.post('/signinStore', signin.postSigninStore);
router.get('/dashboard', passport.authenticate('merchant', { session: false }), dashboard.getDashboard);
router.post('/addStore', passport.authenticate('merchant', { session: false }), store.addStore);
router.get('/getStore', passport.authenticate('merchant', { session: false }), store.getStore);
router.post('/setCashback', passport.authenticate('merchant', { session: false }), cashback.setCashback);
router.post('/getCashback', passport.authenticate('merchant', { session: false }), cashback.getCashback);
router.post('/getUserCashback', passport.authenticate('merchant', { session: false }), cashback.getUserCashback);
router.post('/getMilestone', passport.authenticate('merchant', { session: false }), milestone.getMilestone);
router.post('/setMilestone', passport.authenticate('merchant', { session: false }), milestone.addMilestone);
router.post('/addSurvey', passport.authenticate('merchant', { session: false }), survey.addSurvey);
router.get('/getSurvey', passport.authenticate('merchant', { session: false }), survey.getSurvey);
router.post('/addBill', passport.authenticate('merchant', { session: false }), customerBill.addCustomerBill);


getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length == 2) return parted[1];
        else return null;
    }
    return null;
}

getMerchant = function(token) {
    var base64Token = token.split('.')[1];
    return base64.decode(base64Token);
}

module.exports = router;