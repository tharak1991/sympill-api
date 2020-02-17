var Merchant = require('../models/merchant');

module.exports = {
    postSignup: function(req, res) {
        if (!req.body.email || !req.body.password)
            res.json({
                success: false,
                message: 'Username or password is not received'
            });
        else {
            var newMerchant = new Merchant({
                name: 'Studio Gulal',
                email: req.body.email,
                password: req.body.password,
                url: 'google.com',
                admin_name: 'Jhon',
                mobile: 789456123,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false,
                    is_blocked: false,
                    last_login: Date.now(),
                    login_failure: 0,
                    login_ip: null,
                    is_loggedin: false
                }
            });
            newMerchant.save(function(err) {
                console.log(err);
                if (err) return res.json({
                    success: false,
                    message: 'Merchant already exists.'
                })
                res.json({
                    success: true,
                    message: 'Merchant created successfully.'
                });
            });
        }
    }
}