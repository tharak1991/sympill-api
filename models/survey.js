var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
})

var SurveySchema = new Schema({
    merchant_id: { type: Schema.Types.ObjectId, ref: 'Merchant' },
    store_id: { type: Schema.Types.ObjectId },
    question1: QuestionSchema,
    question2: QuestionSchema,
    question3: QuestionSchema,
    _meta: {
        created_time: Date,
        updated_time: Date,
        is_active: Boolean,
        is_deleted: Boolean
    }
});

module.exports = mongoose.model('Survey', SurveySchema);