const asyncHanlder = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register User
//@route POST /api/users
//@access public
const registerUser = asyncHanlder(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`User created ${user}`);
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    //res.json({message:"Register the user"});
});

//@desc login user
//@route POST /api/users
//@access public
const loginUser = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fieds are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "100m" })
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password in not valid");
    }
    //res.json({message:"Login the user"});
});

//@desc current user
//@route GET /api/users
//@access private
const currentUser = asyncHanlder(async (req, res) => {
    res.json(req.user);
});



module.exports = {
    registerUser, loginUser, currentUser
}