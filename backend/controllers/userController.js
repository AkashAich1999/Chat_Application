import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req,res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;

        // Checking Empty Input Fields
        if(!fullName || !userName || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All Fields Are Required."});
        }

        // Checking if Password Enter Does Not Match Confirm Password
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password & Confirm Password Does Not Match."});            
        }

        const user = await User.findOne({userName});

        // Checking if Username Already Exists
        if(user){
            return res.status(400).json({message:"Username Already Exists. Try With Different Username."});   
        }

        // Hashing The Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Fetching ProfilePhoto Avatar
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

        // Creating User
        await User.create({
            fullName,
            userName,
            password:hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender,
        });

        return res.status(201).json({
            message:"Account Created Successfully.",
            success:true
        })
    } catch(error) {
        console.log(error);
    }
}

export const Login = async (req,res) => {
    try {
        const { userName, password } = req.body;

        // Checking Empty Input Fields
        if(!userName || !password){
            return res.status(400).json({message:"All Fields Are Required."});
        }

        const user = await User.findOne({userName});

        // If User does not exists in the Database with the userName Entered
        if(!user){
            return res.status(400).json({
                message:"Incorrect Username or Password.",
                success:false
            });
        };

        // Comparing the Password Entered with the Saved Password. 
        const isPasswordMatch =  await bcrypt.compare(password, user.password);
        
        // If Password Does Not Match
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Username or Password.",
                success:false
            });
        };

        // If Password Matches
        const tokenData = {
            userId:user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn:'1d'});
        // Storing the token in Cookie
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            _id:user._id,
            userName:user.userName,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });
    } catch (error) {
        console.log(error);
    }
};