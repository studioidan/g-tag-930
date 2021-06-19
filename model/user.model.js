const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    role: {type: String, enum: ['user', 'admin', 'owner'], default: 'user'},
    email: {type: String, unique: [true, 'email already exists'], required: true},
    name: {type: String},
    password: {type: String, required: true},
    isLocked: {type: Boolean, default: false},

}, {timestamps: true});


const User = mongoose.model('User', schema);
module.exports = User;
