const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS --> MiddleWare se va ajecutar para todas lineas que siguen abajo
app.use(cors());

//Base de datos
dbConnection();

//console.log( process.env);

app.get( '/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg:'Hola Mundo'
    })
} );


app.listen(process.env.PORT, () => {
        console.log('Servidor corriendo en puerto: '+process.env.PORT);
    }
);