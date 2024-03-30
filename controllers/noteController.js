const Note=require("../models/noteSchema")

const getNotes=async(req,res)=>{
    try {
        const allNotes=await Note.find({user: req.userId});
        res.status(201).json({notes: allNotes})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"})
    }
}
const createNote=async(req,res)=>{
    const {title,description}=req.body;
    if(!title || !description){
        res.status(400).json({message: "All fields are mandatory"})
    }
    const note = new Note({
        title: title,
        description: description,
        user: req.userId
    })
    try {
        await note.save()
        res.status(201).json({note: note})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"})
    }
}
const updateNote=async(req,res)=>{
    const id=req.params.id;
    const {title,description}=req.body
    const updatedNote={
        title: title,
        description: description,
        user: req.userId
    }
    try {
        const note=await Note.findById(id);
        if(note.user.toString()!==req.userId){
            return res.status(401).json({message: "Unauthorized Access to other notes"})
        }
        await Note.findByIdAndUpdate(id,updatedNote,{new: true})
        return res.status(201).json({note: "Note Successfully Updated",updatedNote})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"})
    }
}
const deleteNote=async(req,res)=>{
    const id=req.params.id
    try {
        const note=await Note.findById(id);
        if(note.user.toString()!==req.userId){
            return res.status(401).json({message: "Unauthorized Access to Delete other notes"})
        }
        const deletedNote=await Note.findByIdAndDelete(id)
        return res.status(201).json({note: "Note Successfully Deleted",deletedNote})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"})
    }
}

module.exports={
    getNotes,
    createNote,
    updateNote,
    deleteNote
}