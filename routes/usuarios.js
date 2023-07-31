const { Router } = require('express');
const router = Router();

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPostRespuesta,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

// usuariosGet es la referencia. NO es la funcion usuariosGet()
router.get('/',usuariosGet );
router.put('/:id', usuariosPut);
router.post('/',usuariosPost);
router.post('/respuesta',usuariosPostRespuesta);
router.delete('/',usuariosDelete);
router.patch('/',  usuariosPatch);


module.exports = router
