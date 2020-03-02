var Merchant = require('../models/merchant');

module.exports = {
    signup: function(req, res) {
        if (!req.body.number || !req.body.password)
            return res.json({
                success: false,
                message: 'Please provide all required fields'
            });
        else {
            console.log(req.body)
            var newMerchant = new Merchant({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                url: req.body.url,
                admin_name: req.body.adminName,
                mobile: req.body.number,
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
                if (err) {
                    console.log(err)
                    return res.json({
                        success: false,
                        message: 'Merchant already exists.'
                    })
                }
                return res.json({
                    success: true,
                    message: 'Merchant created successfully.'
                });
            });
        }
    }
}