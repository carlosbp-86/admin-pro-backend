const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar email

        const usuarioDB = await Usuario.findOne( { email } );

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        } 

        // Generar el TOKEN - JWT
        console.log(usuarioDB.id);
        const token = await generarJWT( usuarioDB.id )


        res.json({
            ok: true,
            token: token,
            msg: 'Login funciona'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el administrador'
        })
    }

}


module.exports = {
    login
}