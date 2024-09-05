document.addEventListener('DOMContentLoaded', () => {
	if (typeof io === 'undefined') {
		console.error('Socket.IO no está definido. Verifica la carga del script.');
		return;
	}

	const socket = io('http://localhost:5050', { path: '/real-time' });

	socket.emit('requestConductorInfo');

	socket.on('conductorInfo', (data) => {
		document.getElementById('conductorName').textContent = data.name || 'No disponible';
		document.getElementById('conductorPlate').textContent = data.plate || 'No disponible';

		console.log(data);
	});

	document.getElementById('buttonOrigin').addEventListener('click', () => {
		const origin = document.getElementById('originInput').value.trim();
		if (origin) {
			console.log('Origen:', origin);
			socket.emit('setOrigin', { origin });
		} else {
			alert('Por favor, ingresa el origen.');
		}
	});

	document.getElementById('buttonDestination').addEventListener('click', () => {
		const destination = document.getElementById('destinationInput').value.trim();
		if (destination) {
			console.log('Destino:', destination);
			socket.emit('setDestination', { destination });
		} else {
			alert('Por favor, ingresa el destino.');
		}
	});

	document.getElementById('buttonAccept').addEventListener('click', () => {
		console.log('Aceptar Viaje presionado');
		socket.emit('acceptTrip');

		window.location.href = 'http://127.0.0.1:3000/buscando/buscando.html';
	});
});
