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
    origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
    methods: ['GET', 'POST', 'DELETE'], // Added DELETE method
}));

app.use(express.json()); // Permitir que el servidor maneje JSON en el cuerpo de las solicitudes
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta "public"

const db = {
    conductores: [],
    pasajeros: [],
    vehiculos: [], // Nuevo array para los vehículos
    origin: '', // Nueva propiedad para origen
    destination: '', // Nueva propiedad para destino
};

// Ruta para obtener todos los datos
app.get('/', (req, res) => {
    res.send(db);
});

// Ruta para obtener todos los vehículos
app.get('/vehiculos/', (req, res) => {
    res.send(db.vehiculos);
});

// Ruta para eliminar un vehículo específico por placa
app.delete('/vehiculos/:plate', (req, res) => {
    const plate = req.params.plate;
    const index = db.vehiculos.findIndex(vehicle => vehicle.plate === plate);

    if (index !== -1) {
        db.vehiculos.splice(index, 1);
        console.log(`Vehículo con placa ${plate} eliminado.`);
        res.status(200).send({ message: 'Vehículo eliminado correctamente' });
    } else {
        console.error(`Vehículo con placa ${plate} no encontrado.`);
        res.status(404).send({ message: 'Vehículo no encontrado' });
    }
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

httpServer.listen(5050, () => {
    console.log('Servidor corriendo en http://localhost:5050');
});
