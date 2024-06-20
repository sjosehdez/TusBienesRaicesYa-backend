const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioBD = await Usuario.findOne({ email});
        if( !usuarioBD ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no es válido'
                //msg: 'Contraseña o Email no es válido'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Password no válido'
            });
        }

        //Generar el token 
        const token = await generarJWT(usuarioBD.id)
        
        res.json({
            ok: true,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador '
        });
    }
}

const googleSignIn = async(req, res = response) => {

    try {
        const { email, name, exp, picture } = await googleVerify( req.body.token);

        const usuarioDB = await Usuario.findOne( { email } );
        let usuario;

        if( !usuarioDB){
            usuario = new Usuario({
                 nombre: name,
                 email,
                 password: '@@@',
                 img: picture,
                 google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            //usuario.password = '@@@'
        }

        // Guardar Usuario
        await usuario.save();

        // Generar el TOKEN - JWT 
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            email, name, exp, picture, token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Token de Google no es correcto.'
        });        
        
    }
    

}


module.exports = {
    login, googleSignIn
}