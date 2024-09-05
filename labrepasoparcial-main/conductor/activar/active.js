document.addEventListener('DOMContentLoaded', function () {
	const socket = io('http://localhost:5050', { path: '/real-time' });

	function fetchVehicles() {
		fetch('http://127.0.0.1:5050/vehiculos/')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error en la solicitud: ' + response.statusText);
				}
				return response.json(); // Convertir la respuesta en JSON
			})
			.then((data) => {
				console.log('Datos recibidos:', data);

				// Obtener el div para mostrar los resultados
				const resultsDiv = document.getElementById('results');

				// Verificar si el div fue encontrado
				if (!resultsDiv) {
					console.error('No se encontró el div con id "results"');
					return;
				}

				// Limpiar el contenido actual del div
				resultsDiv.innerHTML = '';

				// Crear un elemento para cada vehículo y añadirlo al div
				data.forEach((vehicle) => {
					// Crear un nuevo div para cada vehículo
					const vehicleDiv = document.createElement('div');
					vehicleDiv.className = 'vehicle-item'; // Puedes agregar estilos específicos en tu CSS

					// Añadir el contenido al nuevo div
					vehicleDiv.innerHTML = `
                      <p><strong>Vehículo:</strong> ${vehicle.username}</p>
                      <p><strong>Placa:</strong> ${vehicle.plate}</p>
                      <button class="activate-vehicle-btn" data-plate="${vehicle.plate}">Activar</button>
                      <button class="delete-vehicle-btn" data-plate="${vehicle.plate}">Eliminar</button>
                  `;

					// Añadir el nuevo div al div de resultados
					resultsDiv.appendChild(vehicleDiv);
				});

				// Añadir event listeners para los botones de eliminar
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
								fetchVehicles(); // Actualiza la lista de vehículos después de eliminar
							} catch (error) {
								console.error('Error al eliminar:', error);
								alert('Error al eliminar el vehículo');
							}
						}
					});
				});

				// Añadir event listeners para los botones de activar
				document.querySelectorAll('.activate-vehicle-btn').forEach((button) => {
					button.addEventListener('click', (event) => {
						const plateToActivate = event.target.getAttribute('data-plate');

						// Show activation message
						alert(`Has activado vehículo con placa ${plateToActivate}`);

						// Redirigir a otra página al activar
						window.location.href = `http://127.0.0.1:3001/nuevo/nuevo.html`;
					});
				});
			})
			.catch((error) => {
				console.error('Error al obtener los datos:', error); // Manejo de errores
			});
	}

	fetchVehicles(); // Cargar los vehículos al inicio
});
