const User = require("../models/userModel")
const JWT = require("jsonwebtoken")
const ErrCode = 11000;
const jwtsecret = "@Harsh12345";

                                

exports.getUser = async (req,res) => {
    const { Fname , Lname, Email , hasedpassword } = req.body;
    try{
        const newUser = new User({
                FirstName : Fname,
                LastName : Lname,
                Password : hasedpassword,
                Email,
            });
        newUser.save();
    }catch(err){
        if(err.code === ErrCode){
            console.log("duplicate documents are there")
        }
    }
    res.send("");
}


exports.verifyUser = async (req,res)=>{
    const { Email , Fname } = req.body;
    const payload = {
        Email,
    }
    const token = JWT.sign(payload,jwtsecret,{expiresIn : '1h'});

    res.json({token , Fname});
}