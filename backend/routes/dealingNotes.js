const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchUser.js');
// importing Notes schema for data entry in database
// schema is basic template in which database will store data
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Router-1 get all notes of the user here
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // because we used fetchuser middleware we will be able to use id of the user and hence bringing notes of that use
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// Router-2 for adding notes
// post request because we want to add notes
router.post('/addnote', fetchuser, [
    body('title', 'Title of the notes cannot be Empty').isLength({ min: 5 }),
    body('description', 'Description must be at least 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Missing details' });
        }

        const { title, description, tag } = req.body;

        // Creating a new note
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id, 
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


//                   ROUTER 3-Updating notes
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const {title,description,tag}=req.body;
    //creating a new note
    const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //find the note to be updated and update it
    let note= await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    // alow updating only if user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Illegal Action ")
    }
    //updatin note after verification
    note=await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
        
    }
    
})

//                         ROUTER 4- Deleting a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find the note that need to be deleted
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
     //         Let  indicates that we are creating a variable to store the result of the asynchronous operation.

    //alow deletion only if user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Illegal Action")
    }
    //deletion of note
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Sucess":"Note has been Deleted Successfully"})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
    

})


module.exports = router

 
