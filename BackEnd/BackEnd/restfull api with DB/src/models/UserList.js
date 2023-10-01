const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserListSchema = new Schema({

    first_id: {
        type: ObjectId,
        required: true,
        // description: "'Fname' is a required string"
    },
    second_id: {
        type: ObjectId,
       required: true,
        //description: "'Lname' is a required string"
    },
    date: {
        type: Date,
        required: true,
        description: "'password' is a required string"
    },

    


});
module.exports = mongoose.model('UserList', UserListSchema);
