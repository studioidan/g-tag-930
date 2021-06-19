const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// mongodb+srv://admin:<password>@g-tag-930.l1iqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const db = 'mongodb+srv://idan:koko1234@g-tag-930.l1iqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('mongodb connected'))
    .catch(err => console.error(err));


// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'})); // for parsing


// load controller
const apiCtrl = require('./routes/api');


app.use('/api', apiCtrl);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
