angular
  .module('playlist', [])
  .controller('playlistController', function($http){

    var self = this;
    self.test = "Hello!";
    self.searchTerm = '';
    self.results = {'test': 'hi'};
    console.log(self.results);
    self.searchTermCall = function (search){
      $http.post('/search', {'searchTerm': self.searchTerm})
        .then(function(res){
          self.results = res.data;
          console.dir(res.data);
        })
    };
    self.saveSong = function (song) {
      var newSong = song.title;
      $http.post('/playlist',{'owner': 'hunter', 'songs': newSong});

      console.log(song);
    };


  })
