//Modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Youtube Search API and Variables
var youtube = require('youtube-search');
var ytConfig = {
    maxResults: 8,
    key:,
    type: 'video'
};

//Database
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/playlistAPI');
var playlist = require('./source/models/playlistAPI.js');

//Routes
playlistRouter = require('./source/routes/playlistRoutes.js')(playlist, youtube, ytConfig);



//Express and BodyParser
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

//include modules into src
app.use(express.static('source'));
app.use(express.static('node_modules'));
//listening on port 8080
var port = 8080;
app.listen(process.env.PORT || port);
console.log('Server Started on port ' + port);
//Routing*****

app.use('/', playlistRouter);
