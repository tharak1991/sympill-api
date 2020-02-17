var MedicineQuery = require('../models/medicinequery');
const fs = require('fs');
const AWS = require('aws-sdk');


module.exports = {
    addMedicineQuery: async function (req, res) {
        try {
          
            const photos = req.files;

            // check if photos are available
            if (!photos) {
                res.status(400).send({
                    status: false,
                    data: 'No photo is selected.'
                });
            } else {
                let data = [];

                // iterate over all photos
                photos.map(p => data.push({
                    name: p.originalname,
                    mimetype: p.mimetype,
                    size: p.size
                }));

                // send response
                res.send({
                    status: true,
                    message: 'Photos are uploaded.',
                    data: data
                });
            }

        } catch (err) {
            res.status(500).send(err);
        }


    },

    addUser2: function (req, res) {

        res.render('index', {
            title: 'add'
        });
    },

    uploadFile: async function (req, res) {
        // Read content from the file
        const fileContent = fs.readFileSync('capture.png');

        const ID = 'AKIAJXEFJNBCEVBEV7HA';
        const SECRET = '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';

        // The name of the bucket that you have created
        const BUCKET_NAME = 'test-bucket';

        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });

        // Setting up S3 upload parameters
        const params = {
            Bucket: 'prescription-patients',
            Key: 'cat.jpg', // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
    }
}