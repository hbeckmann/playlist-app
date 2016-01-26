var express = require('express');

var routes = function(playlist, youtube, ytConfig){

  var playlistController = require('../controllers/playlistController.js')(playlist);
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
  .post(playlistController.post)
  .get(playlistController.get);

  playlistRouter.use('/playlist/:playlistId', function(req, res, next){
    playlist.findById(req.params.playlistId, function (err, lists){
      if(err) {
        return console.log(err);
      } else if (lists){
        console.log(lists);
        req.lists = lists;
        next();
      } else {
        res.status(404).send('no song found');
      }
    })
  })

  playlistRouter.route('/playlist/:playlistId')
  .put(function (req, res){
      req.lists.owner = req.body.owner;
      req.lists.songs = req.body.songs;
      req.lists.save(function(err){
        if(err) {
          res.send(err);
          console.log(err);
        }else{
          res.json(req.lists)
        }
      console.log(req.lists);
    })
  })

  .get(function (req,res){
    res.json(req.lists);
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
  })

  .delete(function(req, res){
    req.lists.remove(function(err){
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('removed!');
      }
    });
  })


  return playlistRouter;
};

module.exports = routes;
