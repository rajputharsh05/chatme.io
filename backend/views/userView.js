const express = require("express")
const userRouter = express.Router();
const { getUser, verifyUser } = require("../controllers/userController");
const { hashpassword, verifyHash } = require("../middleware/hashpassword");

userRouter.post("/",hashpassword,getUser)
userRouter.post("/login",verifyHash,verifyUser)

module.exports = userRouter;