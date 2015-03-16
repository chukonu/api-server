var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Sitekey = new Schema({});
Sitekey.statics.createAndSave = function (props, callback) {
  var sitekey = new Sitekey(props);
  sitekey.save(function(err, result) {
    callback(err, result);
  });
  return sitekey;
};

module.exports = mongoose.model('Sitekey', Sitekey);