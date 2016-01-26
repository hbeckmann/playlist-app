var should = require('should');
var sinon = require('sinon');

describe('Playlist Controller Tests:', function(){
  describe('Post', function(){
    it('should not allow an empty owner on post', function(){
      var Playlisttest = function(playlist){this.save = function(){console.log('testing SAVE!')}};

      var req = {
        body: {
          songs: 'Test Song'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var playlistController = require('../controllers/playlistController.js')(Playlisttest);
      playlistController.post(req,res);

      res.status.calledWith(400).should.equal(true, 'bad status ' + res.status.args[0][0]);
      res.send.calledWith('Owner is required').should.equal(true);

    })
  })
})
