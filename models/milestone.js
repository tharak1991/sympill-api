var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MilestoneCashback = new Schema({
    store_id: { type: Schema.Types.ObjectId, ref: 'Store' },
    milestone_name: { type: String, required: true },
    milestone_interval: { type: String, required: true },
    cashback_value: { type: Number, required: true },
    visits_needed: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});

module.exports = mongoose.model('Milestone', MilestoneCashback);