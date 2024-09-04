const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const conductorId = urlParams.get('conductorId')


const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('vehicleForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const plate = document.getElementById('plate').value.trim();

	if (plate) {
		socket.emit('register-vehicle', { plate: plate, username: conductorId });

		// Opcionalmente redirige a una página de confirmación o dashboard
		alert('Vehículo registrado');
		// window.location.href = 'dashboard.html';
	} else {
		alert('Por favor, ingresa el número de placa.');
	}
});
