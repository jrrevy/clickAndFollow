
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var http 			= require('http');
var socketio      	= require('socket.io');

var routes = require('./routes/index');
var users = require('./routes/users');
var choose = require('./routes/choose');
var validate = require('./routes/validate');
var congrats = require('./routes/congrats');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());  //required for Express-Validator

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/choose', choose);
app.use('/validate', validate);
app.use('/congrats', congrats);

	
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
var server = http.Server(app);

if (!module.parent) {
	var server = http.createServer(app).listen(app.get('port'), function(){
		  console.log('Express server listening on port ' + app.get('port'));
		});		
}

//var sessions = {}

var io = socketio.listen(server);

io.on('connection', function(client){
	
	var address = client.handshake.address;
    console.log("New connection from " + address.address + ":" + address.port);
    
    //Notify his color to the new client
    client.color = getColor();
    var colorMessage = '{"color": "'+client.color+'"}';
    
    console.log('New client ' + client.id + ' taking a new color : ' + client.color + ", emitting \ " +colorMessage );

    client.emit('color', colorMessage);
    
    // - - - - - - - - - - - - - - - - - 
    // Message event
    client.on('message', function(data){
      if (data.color) {
          var message = '{ "event": "movement", "color": "'+data.color+'", "x": '+data.x+', "y": '+data.y+' }';
    	  console.log('on message : ' + message);
    	  client.broadcast.emit('message',message);
    	  //io.emit('message',message);
      } else if (client.color) {
          var message = '{ "event": "movement", "color": "'+client.color+'", "x": '+data.x+', "y": '+data.y+' }';
    	  console.log('on message : ' +message);
    	  client.broadcast.emit('message',message);
    	  //io.emit('message',message);
      } else {
    	  console.log('on message without color : ');
      }
   });
    
    // - - - - - - - - - - - - - - - - - 
    // Disconnect event
    client.on('disconnect', function () {
        // remove the user from global session list
	    // TODO
        console.log('Client ' + client.id + 'has left,  releasing color : ' + client.color);
        addColor(client.color);
     
    });
});

//Define socket connexions
colors = ['blue', 'green', 'red', 'yellow', 'azure', 'brown', 'cyan', 'lime', 'navy', 'olive'];
function getColor(){
	  return colors.pop();
}
// Add a new socket color connexion
function addColor(color){
	  return colors.push(color);
}

