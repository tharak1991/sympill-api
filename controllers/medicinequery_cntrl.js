var MedicineQuery  =  require('../models/medicinequery');

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

        res.render('index', { title: 'add' });
    }
}

