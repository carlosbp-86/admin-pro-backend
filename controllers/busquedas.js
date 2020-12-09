/*
    BUSQUEDAS CONTROLLER
*/

const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async ( req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )

/*  // Este código hace lo mismo que el bloque de abajo
    const usuarios = await Usuario.find({ nombre: regex});
    const medicos = await Medico.find({ nombre: regex});
    const hospitales = await Hospital.find({ nombre: regex});
*/    

    // Este bloque hace lo mismo que arriba, pero ahorra tiempo porque solo hace un await a la hora de convertirlo en una promesa.
    const [ usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Medico.find({ nombre: regex}),
        Hospital.find({ nombre: regex})
    ]);

    return res.json({
        ok: true,
        msg: 'GetTodo funciona',
        usuarios: usuarios,
        medicos: medicos,
        hospitales: hospitales,
        busqueda: busqueda        
    })   
}



const getDocumentosColeccion = async ( req, res = response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )

    let data = [];


    switch ( tabla ) {
        case 'medicos':
            
            data = await Medico.find({ nombre: regex})
                               .populate('usuario', 'nombre img')  
                               .populate('hospital', 'nombre img');  

            break;

        case 'hospitales':
        
            data = await Hospital.find({ nombre: regex}).populate('usuario', 'nombre img');  

            break;
            
        case 'usuarios':
    
            data = await Usuario.find({ nombre: regex});  
        
            break;
    
        default:
           return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser: usuarios/medicos/hospitales'
           });
    }

    res.json({
        ok: true,
        resultados: data
    });  
}










module.exports = {
    getTodo,
    getDocumentosColeccion
}