document.addEventListener('DOMContentLoaded', () => {
  console.log('Buscando...');

  // Hacer la solicitud para obtener la información de los vehículos
  fetch('http://127.0.0.1:5050/vehiculos/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
      return response.json(); // Convertir la respuesta en JSON
    })
    .then(data => {
      console.log('Datos recibidos:', data); // Aquí tienes los datos de los vehículos

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
      data.forEach(vehicle => {
        // Crear un nuevo div para cada vehículo
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'vehicle-item'; // Puedes agregar estilos específicos en tu CSS

        // Añadir el contenido al nuevo div
        vehicleDiv.innerHTML = `
          <p><strong>Vehículo:</strong> ${vehicle.username}</p>
          <p><strong>Placa:</strong> ${vehicle.plate}</p>
        `;

        // Añadir el nuevo div al div de resultados
        resultsDiv.appendChild(vehicleDiv);
      });

      // Aquí podrías redirigir a otra página o realizar alguna acción con los datos
      // window.location.href = 'resultado.html'; // Descomenta si necesitas redirigir
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error); // Manejo de errores
    });

  // Simulación de un proceso de búsqueda con un temporizador
  setTimeout(() => {
    console.log('Búsqueda finalizada');
    // window.location.href = 'resultado.html'; // Redirige a la página de resultados si es necesario
  }, 5000); // Cambia el tiempo según sea necesario
});
