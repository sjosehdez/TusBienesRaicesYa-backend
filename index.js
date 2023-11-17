const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS --> MiddleWare se va ajecutar para todas lineas que siguen abajo
app.use(cors());

//Lectura y parseo del body
app.use(express.json() );

//Base de datos
dbConnection();

//console.log( process.env);

//Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/login', require('./routes/auth') );

app.listen(
    process.env.PORT, () => {
        console.log('Servidor corriendo en puerto: '+process.env.PORT);
    }
); 