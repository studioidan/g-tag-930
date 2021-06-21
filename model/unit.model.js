const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    color: {type: String, default: '#000000'},
    name: {type: String, default: 'no-name'},
    unitId: {type: String, default: 'def_id'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {timestamps: true});


const Unit = mongoose.model('Unit', schema);
module.exports = Unit;

