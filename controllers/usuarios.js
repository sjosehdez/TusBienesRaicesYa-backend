const Usuario = require('../models/usuario');
// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const { response } = require('../models/usuario');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    // console.log(desde);
    // const usuarios = await Usuario.find({}, 'nombre email role google ').skip(desde).limit(2)
    // const total = await Usuario.count();
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img ').skip(desde).limit(3)
            ,Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total,
        uid: req.uid
    });
}

const crearUsuario = async (req, res = response) => {
    console.log(req.body);
    const { email, password, nombre } = req.body;
    
    // const errores = validationResult( req );
    // if( !errores.isEmpty() ){ return res.status(400).json({  : false, errors: errores.mapped() }); }

    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya está registrado.'
            });
        }

        const usuario = new Usuario(req.body);

        //Encryptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Se actualiza el jsonwebtoken 
        const token = await generarJWT(usuario.id)        

        //Guardar usuario
        await usuario.save();    

        res.json({
            ok: true,
            usuario,
            token
            }
            );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const actualizarUsuario = async(req, res = response ) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaciones
        const {password, google, email, ...campos } = req.body;

        if(usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email} );
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        // delete campos.password;
        // delete campos.google;
        if(usuarioDB.google){
            campos.email = email;
        }else if( usuarioDB.email !== email ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true });

        res.status(201).json({
            ok: true,
            usuario: usuarioActualizado
        });            

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al querer actualizar usuario.'
        });
    }
}


const borrarUsuario = async(req, res = response ) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Borrar
        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });            

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}


module.exports = {
    getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario
}
