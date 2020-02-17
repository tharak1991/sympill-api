var Survey = require('../models/survey');

module.exports = {
    addSurvey: function(req, res) {
        var token = getToken(req.headers);

        if (token) {
            var newSurvey = {
                merchant_id: getMerchant(token),
                store_id: req.body.store_id,
                question1: {
                    question: req.body.question1.question,
                    option1: req.body.question1.option1,
                    option2: req.body.question1.option2,
                    option3: req.body.question1.option3,
                    option4: req.body.question1.option4,
                },
                question2: {
                    question: req.body.question2.question,
                    option1: req.body.question2.option1,
                    option2: req.body.question2.option2,
                    option3: req.body.question2.option3,
                    option4: req.body.question2.option4,
                },
                question3: {
                    question: req.body.question3.question,
                    option1: req.body.question3.option1,
                    option2: req.body.question3.option2,
                    option3: req.body.question3.option3,
                    option4: req.body.question3.option4,
                },
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            }
            Survey.findOneAndUpdate({ merchant_id: getMerchant(token) }, newSurvey, { upsert: true },
                (function(err) {
                    if (err) return res.json({
                        success: false,
                        message: 'Survey creation failed.',
                        reason: err
                    })
                    res.json({
                        success: true,
                        message: 'Survey created successfully.'
                    });
                }));
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    getSurvey: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            Survey.find({ 'merchant_id': getMerchant(token) }, function(err, survey) {
                if (err) throw err;
                if (!survey) res.status(200).send({
                    success: false,
                    message: 'Survey not found, Create One.'
                });
                res.status(200).send({
                    success: true,
                    message: survey
                });
            }).select({ "_meta": 0, "__v": 0 });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    }
};