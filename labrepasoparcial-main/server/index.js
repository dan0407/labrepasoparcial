// const express = require('express');
// const { createServer } = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     path: '/real-time',
//     cors: {
//         origin: '*',
//     },
// });

// const db = {
//     conductores: [],
//     pasajeros: [],
//     vehiculos: [], // Nuevo array para los vehículos
//     origin: '', // Nueva propiedad para origen
//     destination: '', // Nueva propiedad para destino
// };

// app.get('/', (req, res) => {
//     res.send(db)
// })

// app.get('/vehiculos/', (req,res)=> {
//     res.send(db.vehiculos)
// })

// // Función para obtener un conductor aleatorio
// function getRandomConductor() {
//     const availableConductors = db.vehiculos;
//     if (availableConductors.length === 0) return null;
//     const randomIndex = Math.floor(Math.random() * availableConductors.length);
//     return availableConductors[randomIndex];
// }

// io.on('connection', (socket) => {
//     console.log('Un usuario se ha conectado');

//     socket.on('register', (data) => {
//         if (data.role === 'conductor') {
//             db.conductores.push(data);
//         } else if (data.role === 'pasajero') {
//             db.pasajeros.push(data);

//             // Asignar un conductor al pasajero
//             const assignedConductor = getRandomConductor();
//             if (assignedConductor) {
//                 socket.emit('conductorAssigned', {
//                     name: assignedConductor.username,
//                     plate: assignedConductor.plate, // Asegúrate de que `plate` esté definido
//                 });
//             } else {
//                 socket.emit('conductorAssigned', {
//                     name: 'No hay conductores disponibles',
//                     plate: 'N/A',
//                 });
//             }
//         }
//         console.log('Datos actuales:', db);
//     });

//     socket.on('requestConductorInfo', () => {
//         // Obtener la información del primer conductor disponible (puedes modificar esta lógica)
//         const assignedConductor = getRandomConductor();
//         if (assignedConductor) {
//             socket.emit('conductorInfo', {
//                 name: assignedConductor.username,
//                 plate: assignedConductor.plate,
//             });
//             console.log('Placa del conductor:', assignedConductor.plate); // Imprimir correctamente
//         } else {
//             socket.emit('conductorInfo', {
//                 name: 'No hay conductores disponibles',
//                 plate: 'N/A',
//             });
//         }
//     });

//     socket.on('setOrigin', (data) => {
//         db.origin = data.origin;
//         console.log('Origen establecido:', db.origin);
//     });

//     socket.on('setDestination', (data) => {
//         db.destination = data.destination;
//         console.log('Destino establecido:', db.destination);
//     });

//     socket.on('acceptTrip', () => {
//         console.log('Viaje aceptado con origen:', db.origin, 'y destino:', db.destination);
//         // Aquí podrías manejar la lógica para aceptar el viaje
//     });

//     socket.on('register-vehicle', (data) => {
//         db.vehiculos.push(data);
//         console.log('Vehículos actuales:', db.vehiculos);
//     });

//     socket.on('disconnect', () => {
//         console.log('Un usuario se ha desconectado');
//     });
// });

// app.use(express.static('public'));

// httpServer.listen(5050, () => {
//     console.log('Servidor corriendo en http://localhost:5050');
// });


const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Importar CORS

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: '/real-time',
    cors: {
        origin: '*', // Permitir cualquier origen para WebSocket
    },
});

// Configurar CORS para las solicitudes HTTP
app.use(cors({
    origin: 'http://127.0.0.1:3000', // Origen de tu aplicación
    methods: ['GET', 'POST'], // Métodos permitidos
}));

const db = {
    conductores: [],
    pasajeros: [],
    vehiculos: [], // Nuevo array para los vehículos
    origin: '', // Nueva propiedad para origen
    destination: '', // Nueva propiedad para destino
};

app.get('/', (req, res) => {
    res.send(db);
});

app.get('/vehiculos/', (req, res) => {
    res.send(db.vehiculos);
});

// Función para obtener un conductor aleatorio
function getRandomConductor() {
    const availableConductors = db.vehiculos;
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
                    plate: assignedConductor.plate,
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
        const assignedConductor = getRandomConductor();
        if (assignedConductor) {
            socket.emit('conductorInfo', {
                name: assignedConductor.username,
                plate: assignedConductor.plate,
            });
            console.log('Placa del conductor:', assignedConductor.plate);
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
