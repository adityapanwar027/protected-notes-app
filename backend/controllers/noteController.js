const { json } = require("express");
const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
    try {
        
    const {title, content} = req.body;
    const note = await Note.create({
        title,
        content,
        user: req.user._id
    });

    res.status(201).json(note);
    } catch (error) {
        res.ststus(500).json({message: error.message});
    }
};

// Get logged-in user's notes
const getNotes = async (req, res) => {
    try {
        
    const notes = await Note.find({user: req.user._id});

    res.json(notes);

    } catch (error) {
        res.ststus(500).json({message: error.message});
    }
};

// Update Notes
const updateNote = async (req, res) => {
    try {
        
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({
            message: "Note not found",
        });
    }

    if (note.user.toString() !== req.user._id.toString()) {
        return res.ststus(401).json({
            message: "Not authorized",
        });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updateNote = await note.save();
    res.json(updateNote);

    } catch (error) {
        res.ststus(500).json({message: error.message});
    }
}

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await note.deleteOne();

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {createNote, getNotes, updateNote, deleteNote};