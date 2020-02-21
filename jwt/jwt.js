var jwt = require('jsonwebtoken');
var constants = require('../constants/constants')
var config = require('../config/jwt')

module.exports = {
    getJWTToken: function(userId) {
        return jwt.sign({id:userId},config.secret,{
            expiresIn: constants.TWENTY_FOUR_HOURS, 
        });
    },
    getPayload: function(token,callback) {
        jwt.verify(token, config.secret, function(err, decoded) {
            callback(err,decoded);
        });
    }
}