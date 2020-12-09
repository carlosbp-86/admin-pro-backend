/*
    MEDICOS CONTROLLER
*/


const { response } = require('express');
const Medico = require('../models/medico');
const usuario = require('../models/usuario');


const getMedicos = async ( req, res ) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img') // Añade a la respuesta el id, nombre e imagen del usuario que creo el médico
                                .populate('hospital', 'nombre img' ); // Añade a la respuesta el id, nombre e imagen del hospital al que pertenece el médico
            

    res.json({
        ok: true,
        medicos: medicos
    })
}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico( {
        usuario: uid,
        ...req.body
    } )

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error a la hora de crear el médico"
        })
    }
}


const actualizarMedico = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico Funciona'
    })
}


const borrarMedico = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'borrarMedico Funciona'
    })
}





module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}