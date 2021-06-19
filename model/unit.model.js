const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    color: {type: String},
    name: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {timestamps: true});


const Unit = mongoose.model('Unit', schema);
module.exports = Unit;
