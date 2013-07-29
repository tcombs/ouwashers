/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(
{
    src: __dirname + '/public',
    paths: [path.join(__dirname, 'public', 'stylesheets')]
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env'))
{
    app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function()
{
    console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
server.listen(process.env.PORT, process.env.IP);

//routing
var api = require('./controllers/api.js');
app.get('/new', api.new);
app.get('/', api.index);
app.get('/add/:team/:ammount', api.add);
app.get('/sub/:team/:ammount', api.sub);
app.get('/clear', api.clear);


//db connection
var databaseSettings = require('./private/dbconnection.js');
mongoose.connect(databaseSettings.dbconstring);


//websockets
io.sockets.on('connection', function(socket)
{
    socket.on('changes', function(game)
    {
        //socket.emit('update scores', {game: game});
        socket.broadcast.emit('update scores',
        {
            game: game
        });
        socket.emit('update scores',
        {
            game: game
        });

    });
});
