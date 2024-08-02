const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const noteSchema = new mongoose.Schema({
  id: { type: String, default: () => nanoid(), unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;