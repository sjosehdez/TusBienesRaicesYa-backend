const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async(req, res = response  ) => {

    const hospitales = await Hospital.find().populate('usuario','nombre email')

    res.json({
        ok: true,
        msg: 'getHospitales',
        hospitales
    });
}

const crearHospital = async(req, res = response  ) => {

    const uid = req.uid;

    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

const actualizarHospital = async(req, res = response  ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
      
        const hospital = await Hospital.findById(id);

        if (! hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el id'
            });            
            
        }

        //hospital.nombre = req.body.nombre;
        const cambiosHospitales = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospitales, { new: true } );

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }

}

const borrarHospital = async(req, res = response  ) => {

    const id = req.params.id;

    try {
      
        const hospital = await Hospital.findById(id);

        if (! hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el id'
            });            
            
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'Hospital borrado',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador no se pudo borrar el hospital.'
        });    
    }

}

module.exports = {
    getHospitales,  crearHospital,  actualizarHospital,     borrarHospital
}