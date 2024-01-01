const bcrypt = require("bcrypt")
const User = require("../models/userModel");

function hashpassword(req,res,next){
    const { Password } = req.body;
    const saltround = 10;
    bcrypt.hash(Password,saltround,(err,hash) => {
            console.log(hash);
            req.body.hasedpassword = hash;
            next();
    })
}

async function verifyHash(req,res,next){
    const { Email ,Password } = req.body;

    try{
        const newUser = await User.findOne({Email})
        if(newUser){
            const newpassword = newUser.Password;
            bcrypt.compare(Password,newpassword,(err,result)=>{
                if(result === true){
                    console.log("Matched");
                    req.body.Fname = newUser.FirstName;
                    next();
                }else{
                    console.log("Not Matched");
                    res.end("Forbidden");
                }
            })
        }
    }catch(err){
        console.log(err);
        res.end("error !");
    }
}

module.exports = {
    hashpassword,
    verifyHash
}