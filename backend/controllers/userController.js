import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

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