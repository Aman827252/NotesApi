const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config()
const SECRET_KEY=process.env.SECRET_KEY;

const auth=(req,res,next)=>{
    try {
        let token=req.headers.authorization
        if(token){
            token=token.split(" ")[1];
            const user=jwt.verify(token,SECRET_KEY)
            req.userId=user.id
        }
        else{
            return res.status(401).json({message: "Unauthorized Access"}) 
        }
        next()
    } catch (error) {
        return res.status(400).json({message: "Cannot Retrieve Notes"})   
    }
}

module.exports=auth