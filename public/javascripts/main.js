$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost')
	//define socket events
	socket.on('connect', function(){
		console.log('connected!')
		$('#room').append('<p class="current">')
	})
	socket.on('message', function(msg){
		if (msg === '\n') {
			$('#room')
				.find('.current')
				.removeClass('current')
				.end()
				.append('<p class="current">')
		} else {
			$('#room .current').html(msg)
		}
	})
	// attach events
	$('#message-input').on('keyup', function(e){
		if (e.which === 13) {
			socket.emit('message', '\n')
			$(this).val('')
		}
			socket.emit('message', $(this).val())
	})
});
