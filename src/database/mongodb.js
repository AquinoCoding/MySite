const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest');
mongoose.Promise = global.Promise;
console.log('Connected');

module.exports = mongoose;

