var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var StoreSchema = new Schema({
    merchant_id: { type: Schema.Types.ObjectId, ref: 'Merchant' },
    name: { type: String, required: true },
    location: { type: String, required: true },
    user_name: { type: String, required: true },
    image: { type: String },
    image_name: { type: String },
    password: { type: String, required: true },
    cashbackBucket: { type: Number },
    balance: { type: Number },
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});
StoreSchema.index({ merchant_id: 1, name: 1 }, { unique: true });


StoreSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else return next();
});

StoreSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};

// StoreSchema.pre('save', function(next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function(err, salt) {
//             if (err) return next(err);
//             bcrypt.hash(user.password, salt, null, function(err, hash) {
//                 if (err) return next(err);
//                 user.password = hash;
//                 next();
//             })
//         })
//     } else return next();
// });

// StoreSchema.methods.comparePassword = function(passw, cb) {
//     bcrypt.compare(passw, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     })
// };
module.exports = mongoose.model('Store', StoreSchema);