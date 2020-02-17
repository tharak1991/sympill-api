var Store = require('../models/store');

module.exports = {
    addStore: function(req, res) {
        var token = getToken(req.headers);

        if (token) {
            var newStore = new Store({
                merchant_id: getMerchant(token),
                name: req.body.name,
                location: req.body.location,
                user_name: req.body.user_name,
                image: req.body.storeLogo,
                image_name: req.body.storeLogoFileName,
                password: req.body.password,
                cashbackBucket : 0,
                balance: 100000 ,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            });
            newStore.save(function(err) {
                if (err) return res.json({
                    success: false,
                    message: 'Store creation failed.',
                    reason: err
                })
                res.json({
                    success: true,
                    message: 'Store created successfully.'
                });
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    getStore: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            Store.find({ 'merchant_id': getMerchant(token) }, function(err, store) {
                if (err) throw err;
                if (!store) res.status(200).send({
                    success: false,
                    message: 'Store not found, Create One.'
                });
                res.status(200).send({
                    success: true,
                    message: store
                });
            }).select({ "_meta": 0, "__v": 0 });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    }
}