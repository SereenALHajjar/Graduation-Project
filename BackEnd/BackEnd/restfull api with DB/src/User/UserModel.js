var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    // _id:{
    //     type:Number,
    //     required: true
    // },
 
    fname: {
        type: String,
        required: true,
        description: "'Fname' is a required string"
    },
    lname: {
        type: String,
       required: true,
        description: "'Lname' is a required string"
    },

    phone: {
        type: String,
        required: false,
        description: "'phone' is a required string"
    },
    register_date:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        description: "'password' is a required string"
    },

    gender: {
        type: String,
        required: true,
        description: "'gender' is a required string"
    },

    city: {
        type: String,
        required: true,
        description: "'city' is a required string"
    },

    photo: {
        data:Buffer,
        contentType: String,
        //type: String,
        required: false,
        // description: "'photo' is a required string"
    },

    birth_date: {

        type: String,
        required: true,
        description: "'birth_date' is a required string"


    },
    ProjectLink: {
        type: [String],
        required: false,
        description: "'ProjectLink' is a required string"
    },
    Skill:{
        type:[String],
        required: false,
        description: "'Skill' is a required string"
    }


});
module.exports =mongoose.model('User', userSchema);
// var skillSchema = new Schema({
//     _id: { type: String,
//         required: true},
//     name: {type: String,
//         required: true},
    
// });
// var projectLinksSchema = new Schema({
//     _id: {},
//     user_id: {},
//     link: {
//         type: [String],
//         description: "'ProjectLinks' is a required string"
//     }
// });
// var skillofusersSchema = new Schema({
//     _id: {
//         type: String,
//         required: true,
//     },
    
//     _userid: {
//         type: String,
//         required: true
//     },
//     _skillid: {
//         type: String,
//         required: true
//     }
// });


// module.exports = mongoose.model('Skill', skillSchema);
// module.exports = mongoose.model('Skiilofusers', skillofusersSchema);
//module.exports = mongoose.model('Project_Links', projectLinksSchema);