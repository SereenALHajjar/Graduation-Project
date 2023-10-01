//var userModel = require("./UserModel");
var userService = require("./UserServices");
// }
var createUserConntrollerfn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);
        res.send({ "status": true, "message": status.msg, "Id": status.userId,"userFname":status.userFname,"userLname":status.userLname });
    } catch (error) {
        console.log(error);
        if (error.status === false && error.msg === "Please enter all required fields") {
            res.send({ "status": false, "message": "Please enter all required fields" });
        } else {
            res.send({ "status": false, "message": "An error occurred while creating the user" });
        }
    }
}
// var createUserConntrollerfn = async (req, res) => {
//     try {
//         console.log(req.body);
//         var status = await userService.createUserDBService(req.body);
//         console.log(status);
//         if (status.status) {
//             res.send({ "status": true, "message": status.msg, "Id": status.userId });
//         } else {
//             console.log(status);
//             res.send({ "status": false, "message": status.msg})
//         }
//     }

//     catch (error) {
//         console.log(error)
//         res.status(400).send(error);
//     }


var loginUserConntrollerfn = async (req, res) => {
    //var result=null;
    try {
        console.log(req.body);
        var result = await userService.loginUserDBService(req.body);
        console.log(result)
        if (result != undefined && result != null) {
            res.send({ "status": true, "message": result.msg, "Id": result.userId,"userFname":result.userFname,"userLname":result.userLname});
        } else {
            res.send({ "status": false, "message": result.msg });
        }


    }
    catch (error) {
        console.log(error)
        res.send({ "status": false, "message": error.msg });
    }
}
var updateUserDBService = async (req, res) => {
    var result = null;
    try {
        result = await userService.updateUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }


    }
    catch {
        console.log(error)
        res.send({ "status": false, "message": error.msg });
    }
}
module.exports = { createUserConntrollerfn, loginUserConntrollerfn, updateUserDBService };
