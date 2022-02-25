const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const URI = process.env.MONGODB_URI;

mongoose.connect(URI);

// export tables

module.exports.User = require('./userModel');


