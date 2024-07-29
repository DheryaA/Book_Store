const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticationToken}=require("./userauth.js");


//user routes 
//Sign-Up Api
router.post("/sign-up", async (req, res) => {

    try {
        const { username, email, password, address } = req.body;
        //check username length is more than three or four
        if (username.length < 4) {
            return res.status(400).json({ message: "username length should be >3" })
        };

        //check username already exist 
        const existingusername = await User.findOne({ username: username });
        if (existingusername) {
            return res.status(400).json({ message: "Username Already Exist" });
        };

        //check email already exist
        const existingemail = await User.findOne({ email: email });
        if (existingemail) {
            return res.status(400).json({ message: "Username Already Exist" });
        };

        //checking password length 
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password Should be >5" });
        };

        const hashPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({ message: "Sign is Successful" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" })
    }
});

//sign-In Api
router.post("/Sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const exsistingUser = await User.findOne({ username });

        if (!exsistingUser) {
            res.status(400).json({ message: "Invalid Credential!" });
        }

       await bcrypt.compare(password, exsistingUser.password, (err, data) => {
            if (data) {

                const authClaims = [
                    { name: exsistingUser.username },
                    { role: exsistingUser.role }
                ]

                const token = jwt.sign({ authClaims }, "bookstore123",{expiresIn:"30d"});

                res.status(200).json({
                    id: exsistingUser._id,
                    role: exsistingUser.role,
                    token: token,
                });
                
            } else {
                res.status(400).json({ message: "Invalid Credential!" })
            }
        });



    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" })
    }
})

//get user information api
router.get("/get-user-information",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const data=await User.findById(id).select('-password ');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//update address
router.put("/update-address",authenticationToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({messge:"Address Updated successfully"})
    } catch (error) {
        res.status(500).json({message:"internal server error!"})
    }
})



module.exports = router;


