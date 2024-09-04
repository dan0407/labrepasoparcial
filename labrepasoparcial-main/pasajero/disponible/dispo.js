// document.addEventListener('DOMContentLoaded', () => {
// 	// Verifica si `io` está definido
// 	if (typeof io === 'undefined') {
// 			console.error('Socket.IO no está definido. Verifica la carga del script.');
// 			return;
// 	}

// 	const socket = io('http://localhost:5050', { path: '/real-time' });

// 	// Solicitar información del conductor al servidor
// 	socket.emit('requestConductorInfo');

// 	// Escuchar el evento con la información del conductor
// 	socket.on('conductorInfo', (data) => {
// 			// Mostrar los datos del conductor
// 			document.getElementById('conductorName').textContent = data.name || 'No disponible';
// 			document.getElementById('conductorPlate').textContent = data.plate || 'No disponible';

// 			console.log(data);
// 	});

// 	// Manejar el clic del botón "Establecer Origen"
// 	document.getElementById('buttonOrigin').addEventListener('click', () => {
// 			const origin = document.getElementById('originInput').value.trim();
// 			if (origin) {
// 					console.log('Origen:', origin);
// 					socket.emit('setOrigin', { origin });
// 			} else {
// 					alert('Por favor, ingresa el origen.');
// 			}
// 	});

// 	// Manejar el clic del botón "Establecer Destino"
// 	document.getElementById('buttonDestination').addEventListener('click', () => {
// 			const destination = document.getElementById('destinationInput').value.trim();
// 			if (destination) {
// 					console.log('Destino:', destination);
// 					socket.emit('setDestination', { destination });
// 			} else {
// 					alert('Por favor, ingresa el destino.');
// 			}
// 	});

// 	// Manejar el clic del botón "Aceptar Viaje"
// 	document.getElementById('buttonAccept').addEventListener('click', () => {
// 			console.log('Aceptar Viaje presionado');
// 			socket.emit('acceptTrip');
// 	});
// });

document.addEventListener('DOMContentLoaded', () => {
	// Verifica si `io` está definido
	if (typeof io === 'undefined') {
		console.error('Socket.IO no está definido. Verifica la carga del script.');
		return;
	}

	const socket = io('http://localhost:5050', { path: '/real-time' });

	// Solicitar información del conductor al servidor
	socket.emit('requestConductorInfo');

	// Escuchar el evento con la información del conductor
	socket.on('conductorInfo', (data) => {
		// Mostrar los datos del conductor
		document.getElementById('conductorName').textContent = data.name || 'No disponible';
		document.getElementById('conductorPlate').textContent = data.plate || 'No disponible';

		console.log(data);
	});

	// Manejar el clic del botón "Establecer Origen"
	document.getElementById('buttonOrigin').addEventListener('click', () => {
		const origin = document.getElementById('originInput').value.trim();
		if (origin) {
			console.log('Origen:', origin);
			socket.emit('setOrigin', { origin });
		} else {
			alert('Por favor, ingresa el origen.');
		}
	});

	// Manejar el clic del botón "Establecer Destino"
	document.getElementById('buttonDestination').addEventListener('click', () => {
		const destination = document.getElementById('destinationInput').value.trim();
		if (destination) {
			console.log('Destino:', destination);
			socket.emit('setDestination', { destination });
		} else {
			alert('Por favor, ingresa el destino.');
		}
	});

	// Manejar el clic del botón "Aceptar Viaje"
	document.getElementById('buttonAccept').addEventListener('click', () => {
		console.log('Aceptar Viaje presionado');
		socket.emit('acceptTrip');

		// Redirigir a la página HTML en la carpeta "buscando"
		window.location.href = 'http://127.0.0.1:3000/buscando/buscando.html';
	});
});
