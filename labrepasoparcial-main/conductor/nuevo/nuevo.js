// client.js

const API_URL = 'http://localhost:5050';

// Fetch passengers, origin, and destination data
async function fetchData() {
	try {
		console.log('Fetching data from server...');
		const response = await fetch('http://localhost:5050');
		console.log('Response received:', response);
		const data = await response.json();
		console.log('Data parsed:', data);

		updatePassengerList(data.pasajeros);
		updateTripInfo(data.origin, data.destination);
	} catch (error) {
		console.error('Error al obtener los datos:', error);
		displayErrorMessage('Failed to load data. Please try again later.');
	}
}

function updatePassengerList(passengers) {
	const passengerList = document.getElementById('passenger-list');
	passengerList.innerHTML = ''; // Clear current list
	passengers.forEach((passenger) => {
		const listItem = document.createElement('li');
		listItem.textContent = `Nombre: ${passenger.username}`;
		passengerList.appendChild(listItem);
	});
}

function updateTripInfo(origin, destination) {
	document.getElementById('origin').textContent = `Origen: ${origin || 'No especificado'}`;
	document.getElementById('destination').textContent = `Destino: ${destination || 'No especificado'}`;
}

function displayErrorMessage(message) {
	const errorElement = document.getElementById('error-message');
	if (errorElement) {
		errorElement.textContent = message;
		errorElement.style.display = 'block';
	} else {
		console.error(message);
	}
}

// Initialize WebSocket connection
const socket = io(API_URL, { path: '/real-time' });

// WebSocket event listeners
socket.on('setOrigin', (data) => updateTripInfo(data.origin, null));
socket.on('setDestination', (data) => updateTripInfo(null, data.destination));
socket.on('updateData', fetchData);

window.onload = () => {
    console.log('Window loaded, fetching data...');
    fetchData();
};
