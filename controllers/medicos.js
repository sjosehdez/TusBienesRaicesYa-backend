const { response } = require("express");
const Hospital = require("../models/medico");

const getMedicos = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'getMedicos'
    });
}

const crearMedico = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'crearMedico'
    });
}

const actualizarMedico = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res = response  ) => {
    res.json({
        ok: true,
        msg: 'borarMedico'
    });
}

module.exports = {
    getMedicos, 
    crearMedico, 
    actualizarMedico, 
    borrarMedico
}