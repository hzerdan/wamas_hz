const { response, request } = require('express');
const { guardardb } = require('../helpers/guardardb');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre="No name",apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req = request, res = response) => {
    const body = req.body;
    guardardb(body);
    res.json({
        msg: 'Post API - controlador',
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
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}