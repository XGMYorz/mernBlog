const mongoose = require('mongoose');
const ico_set = new mongoose.Schema({
  
    oid:  { type: String, required: true },
    icoName:  { type: String, required: true },
    icoImg: { type: String, required: true },
    icoType:  { type: String, required: true },
    Datec:  { type: String, required: true },
    Dateu:  { type: String, required: true },
    itype:{ type: String, required: true }
});


module.exports = mongoose.model('ico_set', ico_set);




