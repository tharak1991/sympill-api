var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var Store = require('../models/store');
var config = require('../config/database');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use('store', new JwtStrategy(opts, function(jwt_payload, done) {
        Store.findOne({ _id: jwt_payload }, function(err, store) {
            if (err) return done(err, false);
            if (store) done(null, store);
            else done(null, false);
        });
    }));
}