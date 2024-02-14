const mongoose = require("mongoose")
const notesSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String },
    userId: { type: String, required: true },
    author: { type: String, required: true }
}, { versionKey: false })

const notesModel = mongoose.model("notess", notesSchema);

module.exports = { notesModel }