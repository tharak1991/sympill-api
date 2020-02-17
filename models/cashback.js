var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var gratification = require('paytmgratify');

var GiftSchema = {
    enabled: { type: Boolean },
    name: { type: String },
    image: { type: String },
    price: { type: Number }
}

var GiftOptions = {
    gift1: GiftSchema,
    gift2: GiftSchema,
    gift3: GiftSchema,
    gift4: GiftSchema,
    gift5: GiftSchema
}

var CashbackSchema = new Schema({
    store_id: { type: Schema.Types.ObjectId, ref: 'Store' },
    min_cashback: { type: Number, required: true },
    avg_cashback: { type: Number, required: true },
    is_giftcard: { type: Boolean },
    giftOptions: GiftOptions,
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});

module.exports = mongoose.model('Cashback', CashbackSchema);