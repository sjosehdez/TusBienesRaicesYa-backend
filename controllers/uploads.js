const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen')

const fileUpload = (req, res = response) => {

    const tipo          = req.params.tipo;
    const id            = req.params.id;

    //Validar tipo
    const tiposValidos  = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hospital.'
        });
    }

    //Validar que exista un archivo en el PUT
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo seleccionado.'
        });
    }    

    //Procesar la imagen
    const file = req.files.imagen;
    console.log(file);

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //Validar extensiones 
    const extensionesValida = ['png','jpg','jepg','gif']
    if(!extensionesValida.includes(extensionArchivo) ){
        return res.status(400).json({
            ok:false,
            msg: 'La extension del archivo no es válida.'
        });        
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${ extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'El archivo no se pudo subir.'
            });
        }

        //Actualizar la base de datos
        actualizarImagen( tipo, id, nombreArchivo); 

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });    

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${foto}` );
    //Imagen por defecto
    if(fs.existsSync(pathImg) ){
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
        console.log('pathgImg:',pathImg)
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload, retornaImagen
}