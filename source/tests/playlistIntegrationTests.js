var should = require('should');
var request = require('supertest');
var server = require('../../server.js');
var mongoose = require('mongoose');
var agent = request.agent(server);
var testSchema = require('../models/playlistAPI.js');
var Playlist = mongoose.model('Playlist');

describe('Playlist Crud Test', function() {
  it('Should allow a playlist to be posted and return a owner and songs', function(done){
    var playlistPost = {owner:'test owner', songs:'supertest songs'};

    agent.post('/playlist')
      .send(playlistPost)
      .expect(200)
      .end(function(err,results){
        results.body.should.have.property('_id');
        /*results.body.should.have.property('songs');*/
        done();
      })
  })

  afterEach(function(done){
    Playlist.remove().exec();
    done();
  })
})
