const { response } = require('express');
const bcrypt = require('bcryptjs');



const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    //const usuarios = await Usuario.find();             // Trae todos los datos
    const usuarios = await Usuario.find({}, 'nombre email role google');           // Indicamos los campos que queremos devolver

    res.json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid
    });
}


const crearUsuario = async (req, res = response) => {

    // console.log( req.body)

    const { email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email})

        if ( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con esa dirección de email'
            })
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();   

        // DEVOLVER JWT
        const token = await generarJWT( usuario.id )
    
        res.json({
            ok: true,
            usuario: usuario,
            token: token
        });        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}


const actualizarUsuario = async ( req, res = response) => {

    // TODO - VALIDAR TOKEN Y COMPROBAR SI EL USUARIO ES CORRECTO

    const uid = req.params.id
    

    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // Actualizaciones

        const { password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email: email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async ( req, res = response) => {

    const uid = req.params.id

    const usuarioDB = await Usuario.findById( uid );

    try {

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }        

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido eliminar el registro'
        })
    }



}




module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}