const express=require("express");
const router=express.Router();
const userRouter=require("./user");
const habitrouter=require("./habits");



router.use("/user",userRouter);
router.use("/habits",habitrouter);


module.exports=router;

