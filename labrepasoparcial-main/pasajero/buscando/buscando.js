document.addEventListener('DOMContentLoaded', () => {
	console.log('Buscando...');

	fetch('http://127.0.0.1:5050/vehiculos/')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error en la solicitud: ' + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			console.log('Datos recibidos:', data);

			const resultsDiv = document.getElementById('results');

			if (!resultsDiv) {
				console.error('No se encontró el div con id "results"');
				return;
			}

			resultsDiv.innerHTML = '';

			data.forEach((vehicle) => {
				const vehicleDiv = document.createElement('div');
				vehicleDiv.className = 'vehicle-item';

				vehicleDiv.innerHTML = `
          <p><strong>Vehículo:</strong> ${vehicle.username}</p>
          <p><strong>Placa:</strong> ${vehicle.plate}</p>
        `;

				resultsDiv.appendChild(vehicleDiv);
			});
		})
		.catch((error) => {
			console.error('Error al obtener los datos:', error);
		});

	setTimeout(() => {
		console.log('Búsqueda finalizada');
	}, 5000);
});
