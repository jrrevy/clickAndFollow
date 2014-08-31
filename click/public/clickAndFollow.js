function move(data) {
	mover = $(document.createElement('div')).addClass('cursor').css({
		'background-color' : data.color,
		'left' : data.x,
		'top' : data.y
	}).html('&nbsp;');
	$(document.body).append(mover);
	mover.fadeOut();
}

function set_color(data) {
	window.my_color = data.color;
}



// - - - - - - - - - - - - - - - - - - - - - - - -
// Main script for mouse following
// - - - - - - - - - - - - - - - - - - - - - - - -

function clickAndFollow(isAdmin) {
	isAdmin = typeof isAdmin !== 'undefined' ? isAdmin : false;
	
	var socket = io();
	socket.on('move', function(data) {
		var data = JSON.parse(data);
		move(data);

	});

	socket.on('color', function(message) {
		var data = JSON.parse(message)
		set_color(data);
	});

	if (isAdmin) {
		socket.emit('set admin',true);
	}
	
	// Deal with mouse moves
	$(function() {
		$(document).mousemove(function(it) {
			socket.emit('move',{
				event : 'mousemove',
				x : it.pageX,
				y : it.pageY,
				color : (window.my_color ? window.my_color : null)
			});
		});
	});
	
	
}