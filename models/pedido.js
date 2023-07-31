const { v4: uuidv4 } = require('uuid');

class Pedido {

    id = "";
    desc = {
        nested:[],
        parameters:{},
        messageType:''
    };
    recibido = null;

    constructor ( desc ) {

        this.id = uuidv4();
        this.desc = {desc};
        this.recibido = new Date().toISOString();
        console.log(this.desc)

    }



}


module.exports = Pedido;

