var Milestone = require('../models/milestone');

module.exports = {
    addMilestone: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var milestone = {
                store_id: req.body.store_id,
                milestone_name:  req.body.milestone_name,
                milestone_interval: req.body.milestone_interval,
                cashback_value: req.body.cashback_value,
                visits_needed: req.body.milestoneVisitsNeeded, 
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            };
            var query = ({ store_id: req.body.store_id }),
                update = milestone,
                options = { upsert: true, new: true, setDefaultsOnInsert: true };

            // Find the document
            Milestone.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return res.json({
                    success: false,
                    message: 'Milestone not set.',
                    reason: error
                })
                res.json({
                    success: true,
                    message: 'Milestone set successfully.'
                });
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    getMilestone: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            Milestone.findOne({ 'store_id': req.body.store_id }, function(err, milestone) {
                if (err) throw err;
                if (!milestone) res.status(200).send({
                    success: false,
                    message: 'Milestone not found, Create One.'
                });
                else
                    res.status(200).send({
                        success: true,
                        message: milestone
                    });
            }).select({ "_meta": 0, "_id": 0, "__v": 0 });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    }
}