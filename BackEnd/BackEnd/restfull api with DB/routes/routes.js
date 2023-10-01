const express=require("express");
var userController=require("../src/User/UserController");
const router=express.Router();
router.route("/user/create").post(userController.createUserConntrollerfn);
router.route("/user/login").post(userController.loginUserConntrollerfn);
//router.route("/user/reset-password2/:id").post(userController.updateUserDBService);
module.exports=router;