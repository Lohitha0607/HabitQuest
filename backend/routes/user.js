const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");


const z=require("zod");
const { User } = require("../db");
const {JWT_SECRET} = require("../config");
const { authmiddleware } = require("../middleware");

const signupschema=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
})

const updateschema=z.object({
    password:z.string().optional(),
    username:z.string().optional()
})

const signinschema=z.object({
    email:z.string().email(),
    password:z.string(),

})

router.post("/signup", async (req,res)=>{
     const body=req.body;
     const parsedbody=signupschema.safeParse(body);
     if(!parsedbody.success){
         return res.json({
            msg:"wrong inputs for signup",
        })
     }

    const alreadyuser=  await User.findOne({
        username:body.username,
    });

    if(alreadyuser){
        return res.status(411).json({
            msg:"user already exixts"
        })
    }

    const newuser= await User.create(body);
    const userid=newuser._id;
    const token=jwt.sign({
          userid
    },JWT_SECRET);

     res.json({
        msg:"user created successfully",
        token:token
     })
});


router.post("/signin",async (req,res)=>{

     const signinbody=req.body;
     const parsedsigninbody=signinschema.safeParse(signinbody);
     if(!parsedsigninbody.success){
        return res.status(411).json({
            msg:"invalid format for signin"
        })
     }

     const user = await User.findOne({
        email:req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userid: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })

});

router.get('/user', authmiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userid);
      if (!user) return res.status(404).json({ msg: 'User not found' });
      res.json({ username: user.username, rewardCount: user.rewardCount });
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching user data', error: error.message });
    }
  });

router.put("/", authmiddleware, async (req, res) => {
    const parsedUpdateBody = updateschema.safeParse(req.body);
    
    if (!parsedUpdateBody.success) {
        return res.status(400).json({ msg: "Invalid update data" });
    }

    try {
        const updatedUser = await User.updateOne(
            { _id: req.userid }, // Find the user by their ID
            { $set: parsedUpdateBody.data } // Update fields based on the parsed body
        );

        if (updatedUser.nModified === 0) {
            return res.status(404).json({ msg: "No changes made or user not found" });
        }

        res.json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error while updating", error: error.message });
    }
});




module.exports=router;