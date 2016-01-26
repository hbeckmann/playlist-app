var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistModel = new Schema({
  owner: {
    type: String
  },
  songs: {
    type: String
  }
});

module.exports = mongoose.model('Playlist', playlistModel)
