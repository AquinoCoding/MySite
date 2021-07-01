const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true});
mongoose.Promise = global.Promise;
console.log('Connected');

module.exports = mongoose;

