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

function clickAndFollow() {
	var socket = io();
	socket.on('message', function(data) {
		var data = JSON.parse(data);
		move(data);

	});

	socket.on('color', function(message) {
		var data = JSON.parse(message)
		set_color(data);
	});

	// Deal with mouse movements
	$(function() {
		$(document).mousemove(function(it) {
			socket.send({
				event : 'mousemove',
				x : it.pageX,
				y : it.pageY,
				color : (window.my_color ? window.my_color : null)
			});
		});
	});
}