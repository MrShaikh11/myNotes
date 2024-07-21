const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Note = new mongoose.model("notes", notesSchema);

module.exports = Note;
