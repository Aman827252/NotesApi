const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const db=require("./db")();
const dotenv=require("dotenv").config()
const userRoute=require("./routes/userRoute")
const noteRoute=require("./routes/notesRoute")
const cors=require("cors")

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(express.json())
app.use("/user",userRoute)
app.use("/notes",noteRoute)

app.use((req,res)=>{
    res.send("This is a Basic Notes API")
})

app.listen(PORT,()=>{
    console.log(`Server listen at ${PORT}`);
})