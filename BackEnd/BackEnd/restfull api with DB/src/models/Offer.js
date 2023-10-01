const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    // _id:{
    //     type:Number,
    //     required: true
    // },
 
    user_id: {
        type: ObjectId,
        required: true,
        // description: "'Fname' is a required string"
    },
    post_id: {
        type: ObjectId,
       required: true,
        description: "'Lname' is a required string"
    },

    money: {
        type: Number,
        required: true,
        description: "'phone' is a required string"
    },
    accepted:{
        type: Number,
        required: true,
    },

    max_date: {
        type: Date,
        required: true,
        description: "'password' is a required string"
    },

    pub_date: {
        type: Date,
        required: true,
        description: "'gender' is a required string"
    }

    


});
module.exports =mongoose.model('Offer', OfferSchema);
