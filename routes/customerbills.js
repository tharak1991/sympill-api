var CustomerBill = require('../models/customerbills');

module.exports = {
    addCustomerBill: function(req, res) {
        var token = getToken(req.headers);

        if (token) {
            var newBill = new CustomerBill({
                merchant_id: getMerchant(token),
                bill_number: req.body.bill_number,
                bill_amount: req.body.bill_amount,
                paytm_number: req.body.paytm_number,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            });
            newBill.save(function(err) {
                if (err) return res.json({
                    success: false,
                    message: 'Bill creation failed.',
                    reason: err
                })
                res.json({
                    success: true,
                    message: 'Bill created successfully.'
                });
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },
}

/* Todo: updated time */