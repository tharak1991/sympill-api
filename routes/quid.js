var passport = require('passport');
require('../config/storePassport')(passport);
var base64 = require('base-64');
var express = require('express');
var router = express.Router();

var waitlist = require('./quidwaitlist');

// var signup = require('./signup');
// var signin = require('./signin');
// var dashboard = require('./dashboard');

// var cashback = require('./cashback');
// var milestone = require('./milestone');
// var survey = require('./survey');
// var customerBill = require('./customerbills');

router.post('/addContact', waitlist.postQuidContact);
// router.post('/signin', signin.postSignin);
// router.post('/signinStore', signin.postSigninStore);
// router.get('/dashboard', passport.authenticate('store', { session: false }), dashboard.getDashboard);
// router.post('/addStore', passport.authenticate('store', { session: false }), store.addStore);
// router.get('/getStore', passport.authenticate('store', { session: false }), store.getStore);
// router.post('/setCashback', passport.authenticate('store', { session: false }), cashback.setCashback);
// router.post('/getCashback', passport.authenticate('store', { session: false }), cashback.getCashback);
// router.post('/getUserCashback', passport.authenticate('store', { session: false }), cashback.getUserCashback);
// router.post('/getMilestone', passport.authenticate('store', { session: false }), milestone.getMilestone);
// router.post('/setMilestone', passport.authenticate('store', { session: false }), milestone.addMilestone);
// router.post('/addSurvey', passport.authenticate('store', { session: false }), survey.addSurvey);
// router.get('/getSurvey', passport.authenticate('store', { session: false }), survey.getSurvey);
// router.post('/addBill', passport.authenticate('store', { session: false }), customerBill.addCustomerBill);
// router.post('/paytmCash', passport.authenticate('store', { session: false }),cashback.paytmTestApi);



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