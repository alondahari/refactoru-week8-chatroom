$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost')
	//define socket events
	socket.on('connect', function(){
		$('#room').append('<p class="current">')
	})

	socket.on('user update', function(users){
		var userList = $('<ul>')
		users.forEach(function(user){
			userList.append('<li>User')
		})
		$('#users').html(userList)

	})

	socket.on('end message', function(){
		$('#room')
			.find('.current')
			.removeClass('current')
			.end()
			.append('<p class="current">')
	})
	
	socket.on('message', function(msg){
		$('#room .current').html(msg)
	})

	// attach events
	$('#message-input').on('keyup', function(e){
		if (e.which === 13) {
			socket.emit('end message', '\n')
			$(this).val('')
		} else {
			socket.emit('message', $(this).val())
		}
	})
});
