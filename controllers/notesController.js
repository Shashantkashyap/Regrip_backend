let nanoid;
(async () => {
    nanoid = (await import('nanoid')).nanoid;
})();

let notes = []; // In-memory storage for notes

// Create a new note
exports.createNote = (req, res) => {
    const { title, content, tags } = req.body;
    const note = {
        id: nanoid(),
        title,
        content,
        tags: tags || [],
    };
    notes.push(note);
    res.status(201).json(note);
};

// Retrieve all notes
exports.getAllNotes = (req, res) => {
    res.status(200).json(notes);
};

// Retrieve a single note by its ID
exports.getNoteById = (req, res) => {
    
    const noteId = String(req.params.id); // Ensure id is a string
    const note = notes.find(n => n.id === noteId);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
};

// Update a note by its ID
exports.updateNoteById = (req, res) => {
    const { title, content, tags } = req.body;
    const note = notes.find(n => n.id === req.params.id);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    res.status(200).json(note);
};

// Delete a note by its ID
exports.deleteNoteById = (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === req.params.id);
    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found" });
    }
    notes.splice(noteIndex, 1);
    res.status(204).end();
};

// Add tags to a note
exports.addTagsToNote = (req, res) => {
    const { tags } = req.body;
    const note = notes.find(n => n.id === req.params.id);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    note.tags = [...new Set([...note.tags, ...tags])]; // Avoid duplicate tags
    res.status(200).json(note);
};

// Remove tags from a note
exports.removeTagsFromNote = (req, res) => {
    const { tags } = req.body;
    const note = notes.find(n => n.id === req.params.id);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    note.tags = note.tags.filter(tag => !tags.includes(tag));
    res.status(200).json(note);
};

// Retrieve notes based on a logical tag query
exports.queryNotesByTags = (req, res) => {
    const { query } = req.body;

    // Convert query object to a filter function
    const filterFunction = convertQueryToFilter(query);
    const filteredNotes = notes.filter(filterFunction);

    res.status(200).json(filteredNotes);
};

// Helper function to convert logical query to a filter function
const convertQueryToFilter = (query) => {
    const { and, or, not } = query;

    if (and) {
        return (note) => and.every(condition => convertQueryToFilter(condition)(note));
    }

    if (or) {
        return (note) => or.some(condition => convertQueryToFilter(condition)(note));
    }

    if (not) {
        return (note) => !convertQueryToFilter(not)(note);
    }

    if (query.tag) {
        return (note) => note.tags.includes(query.tag);
    }

    return () => true;
};
