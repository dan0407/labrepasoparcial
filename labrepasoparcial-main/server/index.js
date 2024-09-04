
// const express = require('express');
// const { createServer } = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
// 	path: '/real-time',
// 	cors: {
// 		origin: '*',
// 	},
// });

// const db = {
// 	conductores: [],
// 	pasajeros: [],
// 	vehiculos: [], // Nuevo array para los vehículos
// };

// // Función para obtener un conductor aleatorio
// function getRandomConductor() {
// 	const availableConductors = db.conductores;
// 	if (availableConductors.length === 0) return null;
// 	const randomIndex = Math.floor(Math.random() * availableConductors.length);
// 	return availableConductors[randomIndex];
// }

// io.on('connection', (socket) => {
// 	console.log('Un usuario se ha conectado');

// 	socket.on('register', (data) => {
// 		if (data.role === 'conductor') {
// 			db.conductores.push(data);
// 		} else if (data.role === 'pasajero') {
// 			db.pasajeros.push(data);

// 			// Asignar un conductor al pasajero
// 			const assignedConductor = getRandomConductor();
// 			if (assignedConductor) {
// 				socket.emit('conductorAssigned', {
// 					name: assignedConductor.username,
// 					plate: assignedConductor.plate, // Asume que cada conductor tiene una propiedad plate
// 				});
// 			} else {
// 				socket.emit('conductorAssigned', {
// 					name: 'No hay conductores disponibles',
// 					plate: 'N/A',
// 				});
// 			}
// 		}
// 		console.log('Datos actuales:', db);
// 	});

// 	socket.on('requestConductorInfo', () => {
// 		// Obtener la información del primer conductor disponible (puedes modificar esta lógica)
// 		const assignedConductor = getRandomConductor();
// 		if (assignedConductor) {
// 			socket.emit('conductorInfo', {
// 				name: assignedConductor.username,
// 				plate: assignedConductor.plate,

// 			});
// 	console.log(plate);

// 		} else {
// 			socket.emit('conductorInfo', {
// 				name: 'No hay conductores disponibles',
// 				plate: 'N/A',
// 			});
// 		}
// 	});

// 	socket.on('register-vehicle', (data) => {
// 		db.vehiculos.push(data);
// 		console.log('Vehículos actuales:', db.vehiculos);
// 	});

// 	socket.on('disconnect', () => {
// 		console.log('Un usuario se ha desconectado');
// 	});
// });

// app.use(express.static('public'));

// httpServer.listen(5050, () => {
// 	console.log('Servidor corriendo en http://localhost:5050');
// });


const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: '/real-time',
    cors: {
        origin: '*',
    },
});

const db = {
    conductores: [],
    pasajeros: [],
    vehiculos: [], // Nuevo array para los vehículos
    origin: '', // Nueva propiedad para origen
    destination: '', // Nueva propiedad para destino
};

// Función para obtener un conductor aleatorio
function getRandomConductor() {
    const availableConductors = db.conductores;
    if (availableConductors.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableConductors.length);
    return availableConductors[randomIndex];
}

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('register', (data) => {
        if (data.role === 'conductor') {
            db.conductores.push(data);
        } else if (data.role === 'pasajero') {
            db.pasajeros.push(data);

            // Asignar un conductor al pasajero
            const assignedConductor = getRandomConductor();
            if (assignedConductor) {
                socket.emit('conductorAssigned', {
                    name: assignedConductor.username,
                    plate: assignedConductor.plate, // Asegúrate de que `plate` esté definido
                });
            } else {
                socket.emit('conductorAssigned', {
                    name: 'No hay conductores disponibles',
                    plate: 'N/A',
                });
            }
        }
        console.log('Datos actuales:', db);
    });

    socket.on('requestConductorInfo', () => {
        // Obtener la información del primer conductor disponible (puedes modificar esta lógica)
        const assignedConductor = getRandomConductor();
        if (assignedConductor) {
            socket.emit('conductorInfo', {
                name: assignedConductor.username,
                plate: assignedConductor.plate,
            });
            console.log('Placa del conductor:', assignedConductor.plate); // Imprimir correctamente
        } else {
            socket.emit('conductorInfo', {
                name: 'No hay conductores disponibles',
                plate: 'N/A',
            });
        }
    });

    socket.on('setOrigin', (data) => {
        db.origin = data.origin;
        console.log('Origen establecido:', db.origin);
    });

    socket.on('setDestination', (data) => {
        db.destination = data.destination;
        console.log('Destino establecido:', db.destination);
    });

    socket.on('acceptTrip', () => {
        console.log('Viaje aceptado con origen:', db.origin, 'y destino:', db.destination);
        // Aquí podrías manejar la lógica para aceptar el viaje
    });

    socket.on('register-vehicle', (data) => {
        db.vehiculos.push(data);
        console.log('Vehículos actuales:', db.vehiculos);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

app.use(express.static('public'));

httpServer.listen(5050, () => {
    console.log('Servidor corriendo en http://localhost:5050');
});
