const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')

const getNotes = asyncHandler(async (req, res) =>
{
    const notes = await Note.find({ userId: req.user.id })
    res.status(200).json(notes);
})

const getNote = asyncHandler(async (req, res) =>
{
    const note = await Note.findById(req.params.id)
    res.status(200).json(note)
})

const postNote = asyncHandler(async (req, res) =>
{
    const { title, description } = req.body;
    if (!title || !description)
    {
        res.status(400)
        throw new Error('Please put some data!');
    }

    const createdNote = await Note.create({
        title: title,
        description: description,
        userId: req.user.id
    })
    res.status(201).json(createdNote);
})

const putNote = asyncHandler(async (req, res) =>
{
    const { title, description } = req.body
    const note = await Note.findById(req.params.id)
    if (!note)
    {
        res.status(404)
        throw new Error('Goal not found!');
    }
    const user = await User.findById(req.user.id);
    if (!user)
    {
        res.status(400)
        throw new Error('User not found!')
    }

    if (note.userId.toString() !== user.id)
    {
        res.status(400)
        throw new Error('Failed to update.')
    }

    if (!title || !description)
    {
        res.status(400)
        throw new Error('Please put updated note!')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, description }, {
        new: true
    })
    res.status(200).json(updatedNote)
})

const deleteNote = asyncHandler(async (req, res) =>
{
    const note = await Note.findById(req.params.id)
    if (!note)
    {
        res.status(404)
        throw new Error('Note not found')
    }

    const user = await User.findById(req.user.id)
    if (!user)
    {
        res.status(400)
        throw new Error('User not found!')
    }
    if (note.userId.toString() !== user.id)
    {
        res.status(400)
        throw new Error('Failed to delete.')
    }
    await note.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getNotes,
    getNote,
    postNote,
    putNote,
    deleteNote,
}