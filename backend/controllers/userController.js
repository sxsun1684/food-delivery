import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find whether the user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Check whether the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = createToken(user._id);

        // Return successful response
        return res.status(200).json({ success: true, token });
    } catch (error) {
        // Handle the error and return the server error message
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
};


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser=async (req,res)=>{
    const {name, email,password} = req.body;
    // try{
    //     //check if user already exists
    //     const exists = await userModel.findOne({email})
    //     if(exists){
    //         return res.json({success:false,message: "User already exists"})
    //     }

    //     // validating email format & strong password
    //     if(!validator.isEmail(email)){
    //         return res.json({success:false,message: "Please enter a valid email"})
    //     }
    //     if(password.length<8){
    //         return res.json({success:false,message: "Please enter a strong password"})
    //     }

    //     // hashing user password
    //     const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    //     const hashedPassword = await bcrypt.hash(password, salt)

    //     const newUser = new userModel({name, email, password: hashedPassword})
    //     const user = await newUser.save()
    //     const token = createToken(user._id)
    //     res.json({success:true,token})

    // } catch(error){
    //     console.log(error);
    //     res.json({success:false,message:"Error"})
    // }
    try {
        // Check whether the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }
    
        // Verify email format and password strength
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password with at least 8 characters" });
        }
    
        // Hash used for user password
        const salt = await bcrypt.genSalt(10); // The salt value is generated to increase the security of the password and prevent rainbow table attacks (attacks by precomputed hashes).
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create and save a new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
    
        // Create a JWT token
        const token = createToken(user._id);
    
        // Return successful response
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
    

}
export {loginUser, registerUser}