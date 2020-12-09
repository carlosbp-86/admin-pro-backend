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


const actualizarMedico = async ( req, res ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if ( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico por ese ID'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

        res.json({
            ok: true,
            medico: medicoActualizado
        });    
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error a la hora de actualizar el médico'
        });
        
    }
}


const borrarMedico = async ( req, res ) => {

    const id = req.params.id;    

    try {

        const medico = await Medico.findById(id);

        if ( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico por ese ID'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El medico ha sido eliminado'
        });    
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Se ha producido un error a la hora de eliminar el medico'
        });
        
    }   

}





module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}