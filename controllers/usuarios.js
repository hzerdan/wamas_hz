const { response, request } = require('express');
const { guardardb } = require('../helpers/guardardb');
const Respuestas = require('../models/respuestas');
const respuestas = new Respuestas
const Ot = require('../models/ot');




const usuariosGet = (req = request, res = response) => {
    const {q, nombre="No name",apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = async (req = request, res = response) => {
    
    const body = req.body;
    respuestas.genera_boxnumber(body);
    const ot = new Ot;


    ot.order_id=body.parameters.order_id;
    ot.hora_de_recepcion=new Date();
    respuestas.arma_order_started(body);
    const r_order_started = respuestas.responde(respuestas.order_started,'/order_started')
    if (r_order_started.status != 'ERROR' ){
        ot.enviado_order_started=true;
        ot.hora_order_started=new Date();
        ot.status_order_started = 200;
        
    } else {
        ot.enviado_order_started=false;
        ot.hora_order_started=new Date();
        ot.status_order_started = 404;
    }
    
    respuestas.arma_order_finished(body);
    
    const r_order_finished = respuestas.responde(respuestas.order_finished,'/order_finished')
    if (r_order_finished.status != 'ERROR' ){
        ot.enviado_order_finished=true;
        ot.hora_order_finished=new Date();
        ot.status_order_finished = 200;
        
    } else {
        ot.enviado_order_finished=false;
        ot.hora_order_finished=new Date();
        ot.status_order_finished = 404;
    }

    respuestas.arma_station_response(body);

    const r_station_response = respuestas.responde(respuestas.station_response,'/station_response')
    if (r_station_response.status != 'ERROR' ){
        ot.enviado_station_response=true;
        ot.hora_station_response=new Date();
        ot.status_station_response = 200;
        
    } else {
        ot.enviado_station_response=false;
        ot.hora_station_response=new Date();
        ot.status_station_response = 404;
    }


    
    // const resp1 = respuestas.order_started;
    // const resp2 = respuestas.order_finished
    const resp3 = {msg:'OK'};

    console.log("ot",ot);

    await ot.save();

    res.json(resp3);
}

const usuariosPostRespuesta = (req = request, res = response) => {
    const body = req.body;
    res.json({
        msg: 'Post API - Respuesta',
        body
    });
}



const usuariosPut = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'put API - controlador ',
        id
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPostRespuesta,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}