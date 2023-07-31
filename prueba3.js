require('colors');
require('dotenv').config();
const axios = require('axios');


const Respuestas = require('./models/respuestas');
const respuesta = new Respuestas;

var boxch = process.env.BOXCH;
var boxgr = process.env.BOXGR;
// var boxnumber = (Math.floor(Math.random() * (max - min + 1) + min )).toString();
var boxnumber = 0;


const pedido = {
    "nested": [
        {
            "nested": [],
            "parameters": {
                "article_id": "78199",
                "ordered_packunits": "3",
                "packunit_size": 1,
                "host_line_id": "1",
                "scan_trazable": "false",
                "scan_lot": "true",
                "geo_code": "07-10-3-05"
            },
            "messagetype": "line"
        },
        {
            "nested": [],
            "parameters": {
                "article_id": "67709",
                "ordered_packunits": "1",
                "packunit_size": "1",
                "host_line_id": "1",
                "scan_trazable": "",
                "scan_lot": "",
                "geo_code": "06-07-2-08"
            },
            "messagetype": "line"
        }
    ],
    "parameters": {
        "order_id": 999999,
        "sub_order_id": 1,
        "host_num_alm": "401",
        "tu_type": "101",
        "check": "false",
        "print": "true",
        "invoice": "true",
        "route_id": "Z40006",
        "priority": 1,
        "special_area": "false",
        "departure_date": 20230623,
        "departure_time": 170000,
        "customer_id": "100524",
        "transfer_id": "162189",
        "uuid": ""
    },
    "messagetype": "order_insert"
}

// respuesta.arma_order_started(pedido,boxnumber);
// console.log("order_started:",respuesta.order_started);
// respuesta.arma_order_finished(pedido,boxnumber);
// console.log("order_finished:",respuesta.order_finished);
respuesta.genera_boxnumber(pedido, boxch, boxgr, boxnumber);
respuesta.arma_order_started(pedido, boxnumber);
// console.log("station_response:",respuesta.station_response);
// var resp = respuesta.station_response

const mandarRespuesta = async (resp = respuesta.order_started) => {




    // const respuesta = await axios.post("http://127.0.0.1:8085/order_insert/respuesta",resp);
    const instance = axios.create({
        baseURL: "http://192.168.125.14:50000/RESTAdapter",
    });
    const respuesta = await instance.post('/order_started', resp, {
        auth: {
            username: 'interfaz_po',
            password: '1053Catamarca'
        }
    });
    console.log(respuesta.data, boxnumber);


}

mandarRespuesta();

