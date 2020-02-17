var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var Merchant = require('../models/merchant');
var config = require('../config/database');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use('merchant', new JwtStrategy(opts, function(jwt_payload, done) {
        Merchant.findOne({ _id: jwt_payload }, function(err, merchant) {
            if (err) return done(err, false);
            if (merchant) done(null, merchant);
            else done(null, false);
        });
    }));
}