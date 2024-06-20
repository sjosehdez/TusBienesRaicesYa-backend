/* 
Ruta: /api/auth 
*/
const { Router } = require('express');
const { login, googleSignIn }  = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.
 post( '/google', 
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
    //  1012074936255-5o1jor04jkim3u4f55rtg9158voqh03j.apps.googleusercontent.com
);


module.exports = router;