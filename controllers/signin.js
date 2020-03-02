var jwt = require('../jwt/jwt');
var Merchant = require('../models/merchant');


module.exports = {
    signin: function(req, res) {
        if (!req.body.number || !req.body.password) {
            return res.json({
                success:false,
                message: 'Provide all required fields',
            })
        }
        Merchant.findOne({
            email: req.body.email
        }, function(err, merchant) {
            if (err) throw err;
            if (!merchant) res.status(401).send({
                success: false,
                message: 'Authentication failed. Merchant not found.'
            });
            else {
                merchant.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.getJWTToken(merchant._id)
                        return res.json({
                            sucess: true,
                            token: 'JWT ' + token,
                            name: merchant.name
                        });
                    } else
                        return res.status(401).send({
                            sucess: false,
                            message: 'Authentication failed. Wrong password.'
                        })
                })
            }
        })
    }
}