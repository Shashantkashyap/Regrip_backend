const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

// Basic Note Operations
router.post('/notes', noteController.createNote);
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.put('/notes/:id', noteController.updateNoteById);
router.delete('/notes/:id', noteController.deleteNoteById);

// Tag Management
router.put('/notes/:id/tags', noteController.addTagsToNote);
router.delete('/notes/:id/tags', noteController.removeTagsFromNote);

// Querying
router.post('/notes/query', noteController.queryNotesByTags);

module.exports = router;
