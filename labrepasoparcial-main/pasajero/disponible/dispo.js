// const socket = io('http://localhost:5050', { path: '/real-time' });

// document.addEventListener('DOMContentLoaded', () => {
// 	// Solicitar información del conductor al servidor
// 	socket.emit('requestConductorInfo');

// 	// Escuchar el evento con la información del conductor
// 	socket.on('conductorInfo', (data) => {
// 		// Mostrar los datos del conductor
// 		document.getElementById('conductorName').textContent = data.name || 'No disponible';
// 		document.getElementById('conductorPlate').textContent = data.plate || 'No disponible';
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
	});
});
