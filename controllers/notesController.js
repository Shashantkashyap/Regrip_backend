let nanoid;
(async () => {
    nanoid = (await import('nanoid')).nanoid;
})();

let notes = []; // In-memory storage for notes

// Create a new note
exports.createNote = (req, res) => {
    const { title, content, tags } = req.body;
    const note = {
        id: nanoid(), // Generate a unique ID for the note
        title,
        content,
        tags: tags || [], // Initialize tags as an empty array if not provided
    };
    notes.push(note); // Add the new note to the in-memory storage
    res.status(201).json(note); // Respond with the created note
};

// Retrieve all notes
exports.getAllNotes = (req, res) => {
    res.status(200).json(notes); // Respond with all notes
};

// Retrieve a single note by its ID
exports.getNoteById = (req, res) => {
    const noteId = String(req.params.id); // Ensure id is a string
    const note = notes.find(n => n.id === noteId); // Find the note with the matching ID
    if (!note) {
        return res.status(404).json({ error: "Note not found" }); // Respond with error if note not found
    }
    res.status(200).json(note); // Respond with the found note
};

// Update a note by its ID
exports.updateNoteById = (req, res) => {
    const { title, content, tags } = req.body;
    const note = notes.find(n => n.id === req.params.id); // Find the note with the matching ID
    if (!note) {
        return res.status(404).json({ error: "Note not found" }); // Respond with error if note not found
    }
    // Update note fields only if new values are provided
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    res.status(200).json(note); // Respond with the updated note
};

// Delete a note by its ID
exports.deleteNoteById = (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === req.params.id); // Find index of the note with the matching ID
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found" }); // Respond with error if note not found
    }
    notes.splice(noteIndex, 1); // Remove the note from the in-memory storage
    res.status(204).end(); // Respond with no content
};

// Add tags to a note
exports.addTagsToNote = (req, res) => {
    const { tags } = req.body;
    const note = notes.find(n => n.id === req.params.id); // Find the note with the matching ID
    if (!note) {
        return res.status(404).json({ error: "Note not found" }); // Respond with error if note not found
    }
    note.tags = [...new Set([...note.tags, ...tags])]; // Avoid duplicate tags
    res.status(200).json(note); // Respond with the updated note
};

// Remove tags from a note
exports.removeTagsFromNote = (req, res) => {
    const { tags } = req.body;
    const note = notes.find(n => n.id === req.params.id); // Find the note with the matching ID
    if (!note) {
        return res.status(404).json({ error: "Note not found" }); // Respond with error if note not found
    }
    note.tags = note.tags.filter(tag => !tags.includes(tag)); // Remove specified tags
    res.status(200).json(note); // Respond with the updated note
};

// Retrieve notes based on a logical tag query
exports.queryNotesByTags = (req, res) => {
    const { query } = req.body;

    // Convert query object to a filter function
    const filterFunction = convertQueryToFilter(query);
    const filteredNotes = notes.filter(filterFunction); // Apply filter function to retrieve notes

    res.status(200).json(filteredNotes); // Respond with filtered notes
};

// Helper function to convert logical query to a filter function
const convertQueryToFilter = (query) => {
    const { and, or, not } = query;

    if (and) {
        return (note) => and.every(condition => convertQueryToFilter(condition)(note)); // Check if all 'and' conditions are met
    }

    if (or) {
        return (note) => or.some(condition => convertQueryToFilter(condition)(note)); // Check if any 'or' condition is met
    }

    if (not) {
        return (note) => !convertQueryToFilter(not)(note); // Check if 'not' condition is not met
    }

    if (query.tag) {
        return (note) => note.tags.includes(query.tag); // Check if note contains the specified tag
    }

    return () => true; // Default filter function (always returns true)
};
