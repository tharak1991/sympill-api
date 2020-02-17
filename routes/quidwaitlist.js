var Quid = require('../models/quid');

module.exports = {
    postQuidContact: function(req, res) {
        // var token = getToken(req.headers);

        // if (token) {
            var newQuidContact = new Quid({              
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                dob: req.body.dob,
                city: req.body.city,
                profession: req.body.profession,
                CompanyColllegeName : req.body.CompanyColllegeName,
                DegreeDetails: req.body.DegreeDetails, 
                KnowingQuid:  req.body.DegreeDetails, 
                WhyQuid: req.body.WhyQuid,  
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            });
            newQuidContact.save(function(err) {
                if (err) return res.json({
                    success: false,
                    message: 'Contact not  saved.',
                    reason: err
                })
                res.json({
                    success: true,
                    message: 'Contact saved successfully.'
                });
            });
        // } else {
        //     res.status(401).send({
        //         sucess: false,
        //         message: "Token Invalid"
        //     });
        // }
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