var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuidSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: String , required: true },
    city:  { type: String , required: true },
    profession:  { type: String , required: true },
    CompanyColllegeName:  { type: String  },
    DegreeDetails: { type: String },
    KnowingQuid:  { type: String },
    WhyQuid: { type: String },
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});


module.exports = mongoose.model('Quid', QuidSchema);