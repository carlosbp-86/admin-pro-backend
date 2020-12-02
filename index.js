require('dotenv').config();

const express = require('express');
const cors = require('cors'); 

const { dbConnection } = require('./database/config');


// Crear el servidor express
const app = express();

// Base de datos
dbConnection();

// Configurar CORS
app.use( cors() );



// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Ola K Ase!!'
    })
} );




app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
} )   