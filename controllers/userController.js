const User=require("../models/userSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
const SECRET_KEY=process.env.SECRET_KEY;

const login=async(req,res)=>{
    
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message: "All fields are mandatory"})
        }
        const user=await User.findOne({email: email})
        if(user){
            const checkPass=await bcrypt.compare(password,user.password);
            if(checkPass){
                const token=jwt.sign({email: user.email,id: user._id},SECRET_KEY)
                return res.status(201).json({token: token})
            }
            else{
                return res.status(401).json({message: "Invalid Credentials"})
            }
        }
        return res.status(400).json({message: "User not exist signup first"})
}

const signUp=async(req,res)=>{

    const {username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are mandatory"})
    }
    const user=await User.findOne({email: email})
    if(!user){
        const genPass=await bcrypt.hash(password,10);
        const newUser=await User.create({
            username: username,
            email: email,
            password: genPass
        })
        const token=jwt.sign({email: newUser.email,id: newUser._id},SECRET_KEY)
        return res.status(201).json({user: newUser,token: token})
    }
    else{
        return res.status(401).json({message: "User Already Exist"})
    }
}

module.exports={
    login,
    signUp
}