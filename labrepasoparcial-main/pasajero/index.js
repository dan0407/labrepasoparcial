// const socket = io('http://localhost:5050', { path: '/real-time' });

// document.getElementById('pasajeroForm').addEventListener('submit', function (event) {
// 	event.preventDefault();

// 	const username = document.getElementById('username').value.trim();

// 	if (username) {
// 		socket.emit('register', { username, role: 'pasajero' });
// 		alert('Pasajero registrado');
// 	} else {
// 		alert('Por favor, ingresa tu nombre.');
// 	}
// });

const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('pasajeroForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();

	if (username) {
		socket.emit('register', { username, role: 'pasajero' });
		alert('Pasajero registrado');

		// Solicitar información del conductor después de registrar al pasajero
		socket.emit('requestConductorInfo');

		// Escuchar la respuesta del servidor con la información del conductor
		socket.on('conductorInfo', (data) => {
			const { name, plate } = data;
			// Redirigir a la página con los datos del conductor en la URL
			window.location.href = `http://127.0.0.1:3000/disponible/dispo.html`;
		});
	} else {
		alert('Por favor, ingresa tu nombre.');
	}
});