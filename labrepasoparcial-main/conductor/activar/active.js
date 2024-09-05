document.addEventListener('DOMContentLoaded', function () {
	const socket = io('http://localhost:5050', { path: '/real-time' });

	function fetchVehicles() {
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
                      <button class="activate-vehicle-btn" data-plate="${vehicle.plate}">Activar</button>
                      <button class="delete-vehicle-btn" data-plate="${vehicle.plate}">Eliminar</button>
                  `;

					resultsDiv.appendChild(vehicleDiv);
				});

				document.querySelectorAll('.delete-vehicle-btn').forEach((button) => {
					button.addEventListener('click', async (event) => {
						const plateToDelete = event.target.getAttribute('data-plate');
						if (confirm('¿Estás seguro de que deseas eliminar el vehículo con placa: ' + plateToDelete + '?')) {
							try {
								const response = await fetch(`http://127.0.0.1:5050/vehiculos/${plateToDelete}`, {
									method: 'DELETE',
								});

								if (!response.ok) {
									throw new Error('Error al eliminar: ' + response.statusText);
								}

								alert('Vehículo eliminado correctamente');
								fetchVehicles();
							} catch (error) {
								console.error('Error al eliminar:', error);
								alert('Error al eliminar el vehículo');
							}
						}
					});
				});

				document.querySelectorAll('.activate-vehicle-btn').forEach((button) => {
					button.addEventListener('click', (event) => {
						const plateToActivate = event.target.getAttribute('data-plate');

						alert(`Has activado vehículo con placa ${plateToActivate}`);

						window.location.href = `http://127.0.0.1:3001/nuevo/nuevo.html`;
					});
				});
			})
			.catch((error) => {
				console.error('Error al obtener los datos:', error);
			});
	}

	fetchVehicles();
});
