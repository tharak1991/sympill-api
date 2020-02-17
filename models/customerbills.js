var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = new Schema({
    store_id: { type: Schema.Types.ObjectId },
    bill_number: { type: Number, required: true },
    bill_amount: { type: Number, required: true },
    paytm_number: { type: Number, required: true },
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});

billSchema.index({ merchant_id: 1, name: 1 }, { unique: false });
module.exports = mongoose.model('CustomerBill', billSchema);