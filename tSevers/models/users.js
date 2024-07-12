const mongoose = require('mongoose');
const Users = new mongoose.Schema({

    bid: { type: String, required: true },
    bTitle: { type: String, required: true },
    uname:  { type: String, required: true },
    bBrief:  { type: String, required: true },
    bContent: { type: String, required: true },
    icoType:  { type: String, required: true },
    Datec:  { type: String, required: true },
    Dateu:  { type: String, required: true }

});


module.exports = mongoose.model('users', Users);



