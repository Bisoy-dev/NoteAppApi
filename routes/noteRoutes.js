const express = require('express');
const router = express.Router();
const { getNotes, getNote, postNote, putNote, deleteNote } = require('../controllers/noteController');
const { protected } = require('../middlewares/authMiddleware')

router.route('/').get(protected, getNotes).post(protected, postNote)
router.route('/:id').get(protected, getNote).put(protected, putNote).delete(protected, deleteNote)

module.exports = router;