const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const conductorId = urlParams.get('conductorId');

const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('vehicleForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const plate = document.getElementById('plate').value.trim();

	if (plate) {
		socket.emit('register-vehicle', { plate: plate, username: conductorId });

		alert('Vehículo registrado');

		window.location.href = 'http://127.0.0.1:3001/activar/active.html';
	} else {
		alert('Por favor, ingresa el número de placa.');
	}
});
