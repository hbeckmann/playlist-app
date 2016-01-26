var express = require('express');

var routes = function(playlist, youtube, ytConfig){

  var playlistRouter = express.Router();
  playlistRouter.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/source/index.html'));
  });
  playlistRouter.post('/search', function(req, res){
      var response = {};
      /*Testing Response
      response.results = req.body.searchTerm;
      res.send(response);
      */
      youtube(req.body.searchTerm, ytConfig, function(err, results){
        if(err) return console.log(err);
        console.dir(results);
        response.results = results;
        res.send(response.results);
      });

  });

  playlistRouter.route('/playlist')
  .post( function (req,res){
    var userPlaylist = new playlist({owner: req.body.owner, songs: req.body.songs})
    userPlaylist.save(function(err) {
      if (err) return err;
      res.send(userPlaylist);
    })
  })

  .get(function (req,res){
    playlist.find(function (err, lists){
      if(err) return console.log(err);
      console.log(lists);
    })
  });

  playlistRouter.route('/playlist/:playlistId')
  .put(function (req, res){
    playlist.findById(req.params.playlistId, function (err, lists){
      list.owner = req.body.owner;
      list.songs = req.body.songs;

      if(err) return console.log(err);
      console.log(lists);
    })
  })

  .get(function (req,res){
    playlist.findById(req.params.playlistId, function (err, lists){
      if(err) return console.log(err);
      console.log(lists);
    })
  })

  .patch(function (req, res){
    if(req.body._id){
      delete req.body._id;
    };
    for(var i in req.body){
      req.lists[i] = req.body[i];
    };
    req.lists.save(function(err){
      if(err) {
        res.send(err);
        console.log(err);
      }else{
        res.json(req.lists)
      }
    })
  });


  return playlistRouter;


};

module.exports = routes;
