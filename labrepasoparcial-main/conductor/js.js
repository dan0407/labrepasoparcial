// const socket = io('http://localhost:5050', { path: '/real-time' });

// document.getElementById('conductorForm').addEventListener('submit', function (event) {
// 	event.preventDefault();

// 	const username = document.getElementById('username').value.trim();

// 	if (username) {
// 		socket.emit('register', { username, role: 'conductor' });

// 		// Espera un poco para asegurar que el servidor haya procesado la solicitud
// 		setTimeout(() => {
// 			window.location.href = 'http://127.0.0.1:3001/placa/htmlpalca.html'; // Redirige a la página de registro del vehículo
// 		}, 500); // Espera 500 ms (medio segundo)
// 	} else {
// 		alert('Por favor, ingresa tu nombre.');
// 	}
// });

const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('conductorForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();

	if (username) {
		// Emite el evento de registro con los datos del conductor
		socket.emit('register', { username, role: 'conductor' });

		// Espera 500 ms para asegurar que el servidor procese la solicitud antes de redirigir
		setTimeout(() => {
			// Corrected the URL path to match the probable correct file name
			window.location.href = 'http://127.0.0.1:3001/placa/htmlpalca.html';
		  }, 500);
	} else {
		alert('Por favor, ingresa tu nombre.');
	}
});
