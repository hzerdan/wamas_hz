const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.usuariosPath = '/order_insert';

        //conectar a base de datos;
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbconnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json());


        //directorio publico
        this.app.use( express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));                

        }

    listen() {

        this.app.listen(this.puerto, () => {
            console.log(`Servidor escuchando en puerto ${this.puerto}`.bgBlue)
        });

    }

}



module.exports = Server