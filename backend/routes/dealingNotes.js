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
            user: req.user.id, // Use req.user.id instead of req.user.body
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
