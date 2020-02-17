var jwt = require('jsonwebtoken');
var config = require('../config/database');
var Merchant = require('../models/merchant');
var Store = require('../models/store');
module.exports = {
    postSignin: function(req, res) {
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
                        var token = jwt.sign(merchant._id.toJSON(), config.secret);
                        res.json({
                            sucess: true,
                            token: 'JWT ' + token,
                            name: merchant.name
                        });
                    } else
                        res.status(401).send({
                            sucess: false,
                            message: 'Authentication failed. Wrong password.'
                        })
                })
            }
        })
    },

    postSigninStore: function(req, res) {
        Store.findOne({
            user_name: req.body.email
        }, function(err, store) {
            if (err) throw err;
            if (!store) res.status(401).send({
                success: false,
                message: 'Authentication failed. Store not found.'
            });
            else {
                store.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.sign(store._id.toJSON(), config.secret);
                        res.json({
                            sucess: true,
                            token: 'JWT ' + token,
                            store: store
                        });
                    } else
                        res.status(401).send({
                            sucess: false,
                            message: 'Authentication failed. Wrong password.'
                        })
                })
            }
        })
    }
}