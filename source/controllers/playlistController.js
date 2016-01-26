var playlistController = function (playlist){

  var post =  function (req,res){
    var userPlaylist = new playlist({owner: req.body.owner, songs: req.body.songs})

    if (!req.body.owner){
        res.status(400);
        res.send("Owner is required");
    } else if(!req.body.songs) {
        res.status(400);
        res.send("Songs are required")
    };

    userPlaylist.save();
    res.status(201);
    res.send(userPlaylist);
  };

  var get = function (req,res){
    playlist.find(function (err, lists){
      if(err) return console.log(err);

      var editedLists = [];
      lists.forEach(function(element, index, array){
        var newList = element.toJSON();
        newList.link={};
        newList.link.self = 'http://' + req.headers.host + '/playlist/' + newList._id;
        editedLists.push(newList);
      });

      console.log(lists);
      res.send(editedLists);
    })
  };



  return {
    post: post,
    get: get
  }
};

module.exports = playlistController;
