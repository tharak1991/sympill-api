var merchant = require('../models/merchant');
var store = require('../models/store');


// Update a note identified by the noteId in the request
exports.updatePassword = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Request content can not be empty"
        });
    }


    if (token) {
        var newStore = new Store({
            merchant_id: getMerchant(token),
            name: req.body.name,
            location: req.body.location,
            user_name: req.body.user_name,
            password: req.body.password,
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


    // Find note and update it with the request body
    store.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

module.exports = {
    setCashback: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var cashback = {
                store_id: req.body.store_id,
                min_cashback: req.body.min_cashback,
                avg_cashback: req.body.avg_cashback,
                is_giftcard: req.body.is_giftcard,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            };

            var query = ({ store_id: req.body.store_id }),
                update = cashback,
                options = { upsert: true, new: true, setDefaultsOnInsert: true };

            // Find the document
            Cashback.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return res.json({
                    success: false,
                    message: 'Cashback not set.',
                    reason: error
                })
                res.json({
                    success: true,
                    message: 'Cashback set successfully.'
                });
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    getCashback: function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            Cashback.findOne({ 'store_id': req.body.store_id }, function(err, cashback) {
                if (err) throw err;
                if (!cashback) res.status(200).send({
                    success: false,
                    message: 'Cashback not found, Create One.'
                });
                else
                    res.status(200).send({
                        success: true,
                        message: cashback
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

/* Todo: updated time */