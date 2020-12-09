/*
    HOSPITALES CONTROLLER
*/


const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async ( req, res ) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img'); // Añade a la respuesta el id, nombre e imagen del usuario que creo el hospital

    res.json({
        ok: true,
        hospitales: hospitales
    })
}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );
    

    // console.log(uid);

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error a la hora de crear el hospital' 
        })
    }


}


const actualizarHospital = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital Funciona'
    })
}


const borrarHospital = ( req, res ) => {
    res.json({
        ok: true,
        msg: 'borrarHospital Funciona'
    })
}





module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}