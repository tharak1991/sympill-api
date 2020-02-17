var passport = require('passport');
require('../config/passport')(passport);
var base64 = require('base-64');
var express = require('express');
var router = express.Router();
// var upload = require('upload');

var user_cntrl = require('../controllers/user_cntrl');
var medicinequery_cntrl = require('../controllers/medicinequery_cntrl');
// var upload = require('upload');

router.post('/add', user_cntrl.addUser);
router.post('/add2', user_cntrl.addUser2);
// router.post('/upload-photos', upload.array('photos', 8), medicinequery_cntrl.addMedicineQuery);
router.post('/upload-photos', medicinequery_cntrl.addMedicineQuery);
router.post('/s3', medicinequery_cntrl.uploadFile);

module.exports = router ;
