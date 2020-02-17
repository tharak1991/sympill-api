var User  =  require('../models/user');

module.exports = {
    addUser: function (req, res) {

        var newUser = new User({
            name: 'Shahid',
            email: 'shahid@codeforgeek.com',
            city: 'mumbai'
        });
        newUser.save()
            .then(item => {
                res.send("item saved to database");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    },

    addUser2: function (req, res) {

        res.render('index', { title: 'add' });
    }
}




    // exports.mobile_verification = async function (req, res) {
    // 	let user = await firebase_controller.verifyRecaptch(req, res).catch(e=> {
    // 		res.json({message: "Error login"});
    // 	});
    // 	if(!user) return res.json({message: "Error login"}); 
    // 	await User.model.findOneAndUpdate({firebase_user_id: user.user_id}, {
    // 		firebase_user_id: user.user_id,
    // 		phone_number: user.phone_number,
    // 		email: user.email,
    // 		firebase_iat: user.iat,
    // 		firebase_exp: user.exp,
    // 		auth_time: user.auth_time
    // 	}, {upsert: 1}).catch(e=> console.error(e));
    // 	res.json({message: "success"});
    // 	user = await User.model.findOne({firebase_user_id: user.user_id}).exec();
    // 	await Token.model.findOneAndUpdate({value: req.headers.authorization}, {value: req.headers.authorization, user: user._id}, {upsert:1});
    // };

    // exports.save_user = async function (req, res) {
    //     var myData = new User(req.body);
    //     myData.save()
    //         .then(item => {
    //             res.send("item saved to database");
    //         })
    //         .catch(err => {
    //             res.status(400).send("unable to save to database");
    //         });
    // };


