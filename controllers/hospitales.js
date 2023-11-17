const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

const crearHospital = async(req, res = response  ) => {

    const hospital = new Hospital( {
        usuario: res.uid,
        ...req.body
    } );
    const uid = req.uid;
    console.log('uid'+uid);

    try {

        await hospital.save();

        res.json({
            ok: true,
            msg: 'crearHospital'
        });        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

const actualizarHospital = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'borarHospital'
    });
}

module.exports = {
    getHospitales,  crearHospital,  actualizarHospital,     borrarHospital
}