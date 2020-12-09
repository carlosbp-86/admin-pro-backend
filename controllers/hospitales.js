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


const actualizarHospital = async ( req, res ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if ( !hospital ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital por ese ID'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });    
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error a la hora de actualizar el hospital'
        });
        
    }
}


const borrarHospital = async ( req, res ) => {
    
    const id = req.params.id;    

    try {

        const hospital = await Hospital.findById(id);

        if ( !hospital ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital por ese ID'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El hospital ha sido eliminado'
        });    
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error a la hora de eliminar el hospital'
        });
        
    }   

}





module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}