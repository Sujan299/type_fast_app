const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {getToken} = require("../utils/jwtHelper")

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "User is not available!" });
        }
        if (user.provider == "google") {
            return res.status(401).json({ error: "Use Google OAuth to login" });
        }
        const isValidUser = await bcrypt.compare(password, user.password);
        if (!isValidUser) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }
        const token = getToken(user);
        // Set cookie without 'secure' for development
        res.cookie("uid", token);
        const sendData = {
            id: user._id,
            username: user.username,
            image: user.image
        }
        res.status(200).json(sendData);
    } catch (err) {
        console.log(err, "Login error!");
        res.status(500).json({ message: "Internal server error" });
    }
};


const google_login = async (req, res)=>{
    // it's risky approach, I need to change it later, 
    // client will send us google_id_token, from where I will extract email and verify here. 
    // just ask deepseek
    try{
        const { email } = req.body;
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({message: "Account not found !"})
        }
        if (user.provider != "google") {
            return res.status(401).json({ error: "Use traditional login !" });
        }
        const token = getToken(user)
        res.status(200).json({ token });
    }catch(err){
        console.log(err, "Error while google login")
    }
}
const signup = async (req, res) => {
    try {
        if (req.body.provider == 'local') {
            const { username, image, email, password, provider } = req.body;
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists !" })
            }
            console.log(password)
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                image: image,
                email: email,
                password: hashPassword,
                provider: provider
            })

            await newUser.save();
        } else {
            const { image, email, googleId, provider } = req.body;
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists !" })
            }
            const newUser = new User({
                image: image,
                email: email,
                googleId: googleId,
                provider: provider
            })

            await newUser.save();
        }
        return res.status(201).json({ message: "User created successfully !" })

    } catch (err) {
        console.log(err, "Getting error while signing up !")
    }
}

module.exports = { login, signup, google_login }