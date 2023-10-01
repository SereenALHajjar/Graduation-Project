var userModel = require("./UserModel");
const multer = require('multer');
const path = require('path');
//var mongoose = require("mongoose");
var key = '123456789trytryrtyr';
var encryptor = require("simple-encryptor")(key);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, `${file.fieldname}-${Date.now()}${ext}`)
//     }
// });

// const upload = multer({ storage: storage });
module.exports.createUserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        if (!userDetails.fname || !userDetails.lname || !userDetails.phone || !userDetails.password
            || !userDetails.gender || !userDetails.city || !userDetails.birth_date|| !userDetails.photo
            || !userDetails.Skill || !userDetails.ProjectLink) {
            reject({ status: false, msg: "Please enter all required fields" });
        }
        // upload.single('photo')(userDetails.req, userDetails.res, (err) => {
        //     if (err) {
        //         reject({ status: false, msg: "Error uploading photo" });
        //     }  else {
       //p9zG01NOwMvsnIMi
                const UserModelData = new userModel();
                // UserModelData._id =new mongoose.Types.ObjectId();
                UserModelData.fname = userDetails.fname;
                UserModelData.lname = userDetails.lname;
                UserModelData.phone = userDetails.phone;
                var encrypted = encryptor.encrypt(userDetails.password);
                UserModelData.password = encrypted;
                UserModelData.register_date = new Date();
                UserModelData.gender = userDetails.gender;
                UserModelData.city = userDetails.city;
                UserModelData.photo = userDetails.photo;//.file.path;
                UserModelData.birth_date = userDetails.birth_date;
                UserModelData.Skill = userDetails.Skill;
                UserModelData.ProjectLink = userDetails.ProjectLink;
                UserModelData.save(function resultHandle(error, result) {

                    if (error) {
                        reject({ status: false, msg: "Error created user" });
                    } else {

                        resolve({ status: true, msg: "User created succcesfully", userId: result._id,userFname:result.fname,userLname:result.lname})//,ff:result.fname 

                    }
                });
        //     }
        // });
    });
}

module.exports.loginUserDBService = (UserDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findOne({ phone: UserDetails.phone }, function getresult(errorvalue, result) {
            if (errorvalue) {
                reject({ status: false, msg: "Invalid Data" })
            }
            else {
                if (result != undefined && result != null) {
                    var decrypted = encryptor.decrypt(result.password);
                    console.log(decrypted)
                    console.log(UserDetails.password)
                    if (decrypted == UserDetails.password) {
                        resolve({ status: true, msg: "User Validated Successfully", userId: result._id,userFname:result.fname,userLname:result.lname });
                        // resolve({status:true,msg:"User Validated Successfully"});
                    }
                    else {
                        reject({ status: false, msg: "User Validated failed" });
                    }
                }
                else {
                    reject({ status: false, msg: "Invaild User Details" });
                }
            }
        });
    });
}
// const mongoose = require('mongoose');

// module.exports.loginUserDBService = (UserDetails) => {
//   return new Promise((resolve, reject) => {
//     userModel.findOneAndUpdate(
//       { phone: UserDetails.phone, password: encryptor.encrypt(UserDetails.password) },
//       { $set: { generatorId: new mongoose.Types.ObjectId() } },
//       { new: true },
//       (error, result) => {
//         if (error) {
//           reject({ status: false, msg: "Invalid Data" });
//         } else if (!result) {
//           reject({ status: false, msg: "Invalid User Details" });
//         } else {
//           const userId = result._id;
//           eventEmitter.emit('userLoggedIn', userId);
//           resolve({ status: true, msg: "User Validated Successfully", userId: userId });
//         }
//       }
//     );
//   });
// };
module.exports.updateUserDBService = (UserDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.updateOne({ password: UserDetails.password }, async function getresult(errorvalue, result) {
            if (errorvalue) {
                reject({ status: false, msg: "Invalid Data" })
            }
            else {
                if (result != null) {
                    var decrypted = encryptor.decrypt(UserDetails.password);

                    const userData = await userModel.findByIdAndUpdate({ _id: UserDetails._id }, { $set: { password: decrypted } })

                    resolve({ status: true, msg: "User Validated Successfully" });

                }
                else {
                    reject({ status: false, msg: "Invaild User Details" });
                }
            }
        });
    });
}