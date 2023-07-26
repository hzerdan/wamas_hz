const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;
        this.usuariosPath = '/order_insert';

        // Middlewares
        this.middlewares();



        // Rutas de mi aplicación
        this.routes();

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