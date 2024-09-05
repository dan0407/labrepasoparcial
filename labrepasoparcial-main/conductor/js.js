const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('conductorForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();

	if (username) {
		// Emite el evento de registro con los datos del conductor
		socket.emit('register', { username, role: 'conductor' });

		setTimeout(() => {
					window.location.href = `http://127.0.0.1:3001/placa/htmlpalca.html?conductorId=${username}`;
		  }, 500);
	} else {
		alert('Por favor, ingresa tu nombre.');
	}
});
