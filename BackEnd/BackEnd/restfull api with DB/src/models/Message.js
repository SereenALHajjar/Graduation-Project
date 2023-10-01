const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    // _id:{
    //     type:Number,
    //     required: true
    // },
 
    sender_id: {
        type: ObjectId,
        required: true,
        // description: "'Fname' is a required string"
    },
    receiver: {
        type: ObjectId,
       required: true,
        //description: "'Lname' is a required string"
    },

    content: {
        type: String,
        required: true,
        description: "'phone' is a required string"
    },
   

    date: {
        type: Date,
        required: true,
        description: "'password' is a required string"
    },

    // room_id: {
    //     type: Number,
    //     required: true,
    //     description: "'gender' is a required string"
    // }

    


});
module.exports =mongoose.model('Message', MessageSchema);
