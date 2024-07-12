const mongoose = require('mongoose');
const Note_set = new mongoose.Schema({

    nid:  { type: String, required: true },
    nTitle:  { type: String, required: true },
    uname:  { type: String, required: true },
    nContent:  { type: String, required: true },
    icoType:  { type: String, required: true },
    Datec:  { type: String, required: true },
    Dateu:  { type: String, required: true },

});

module.exports = mongoose.model('note_set', Note_set);
