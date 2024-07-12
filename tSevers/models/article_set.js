const mongoose = require('mongoose');
const Article_set = new mongoose.Schema({

    aid: { type: String, required: true },
    aTitle: { type: String, required: true },
    uname: { type: String, required: true },
    aBrief: { type: String, required: true },
    aContent: { type: String, required: true },
    icoType: { type: String, required: true },
    state: { type: String, required: true },
    Datec: { type: String, required: true },
    Dateu: { type: String, required: true }

});


module.exports = mongoose.model('article_set', Article_set);



