const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb+srv://adminsympill:dolo@123@cluster1sympill-k7gr0.mongodb.net/test?retryWrites=true&w=majority');
 
const UserSchema = new Schema({
    name: String
  , email: String
  , city: String
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

// var User = mongoose.model('user', UserSchema);

module.exports = mongoose.model('User', UserSchema);

// User.createMapping((err, mapping) => {
//     console.log('mapping created');
// });

// var newUser = new User({
//     name: 'Shahid',
//     email: 'shahid@codeforgeek.com',
//     city: 'mumbai'
// });

// newUser.save((err) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log('user added in both the databases');
// })

// newUser.on('es-indexed', (err, result) => {
//     console.log('indexed to elastic search');
// });