/*
    busqueda
    ruta: '/api/todo/:busqueda'  //comodin
*/ 
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
// const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');

//
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

router.get( '/:busqueda', validarJWT, getTodo ); 

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion ); 



module.exports = router;