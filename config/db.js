const mongoose = require('mongoose');
const url = require('./dbUrl')
module.exports = (req) => {
  mongoose.connect(url.online, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(req);
  });
}