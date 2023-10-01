const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    // _id:{
    //     type:Number,
    //     required: true
    // },
 
    user_id: {
        type: ObjectId,
        required: false,
        // description: "'Fname' is a required string"
    },
    title: {
        type: String,
       required: true,
        description: "'Lname' is a required string"
    },

    description: {
        type: String,
        required: false,
        description: "'phone' is a required string"
    },
    type:{
        type: [String],
        required: true,
    },

    max_date: {
        type: Date,
        required: false,
        description: "'password' is a required string"
    },

    pub_date: {
        type: Date,
        required: false,
        description: "'gender' is a required string"
    }

    


});
module.exports =mongoose.model('Post', PostSchema);
