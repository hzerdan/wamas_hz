require('colors');
require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

// var Pedidos = require('./models/pedidos');
// var pedido = require('./models/pedido');
// var pedidos = new Pedidos

// Manejar el número de cubetas.
// grabar los Order Insert
// diagrama draw.io


let boxch = process.env.BOXCH;
let boxgr = process.env.BOXGR;
let boxnumber = 0;

server.listen();








