const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('pasajeroForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();

	if (username) {
		socket.emit('register', { username, role: 'pasajero' });
		alert('Pasajero registrado');

		socket.emit('requestConductorInfo');

		socket.on('conductorInfo', (data) => {
			const { name, plate } = data;
			window.location.href = `http://127.0.0.1:3000/disponible/dispo.html`;
		});
	} else {
		alert('Por favor, ingresa tu nombre.');
	}
});
