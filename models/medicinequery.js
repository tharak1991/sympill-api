const mongoose     = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb+srv://adminsympill:dolo@123@cluster1sympill-k7gr0.mongodb.net/test?retryWrites=true&w=majority');
 
const MedicineQuerySchema = new Schema({
    patient_id: String,
    medicines: String
  , prescription_files: String

});



module.exports = mongoose.model('MedicineQuery', MedicineQuerySchema);
