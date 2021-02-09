// importing module dependencies
const { validationResult } = require('express-validator')
const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) { // list all ngos existent in database
        // select all columns in 'ngos' table in a
        const ngos = await connection('ngos').select()
        // returns an array of JSONs with the result
        return res.status(200).json(ngos)
    },

    async create(req, res) { // register a new ngo
        // create the following variables from JSON's body request
        const { login, password, name, email, whatsapp, city, state } = req.body
        
        // generate a random 4-byte word to be used as ID
        const id = crypto.randomBytes(4).toString('HEX')
        
        // check parameters
        const { errors } = validationResult(req)

        // check wether there are error in the 
        if (errors.length) {
            return res.status(422).json(errors)
        }

        // encrypts the password and save it in the database
        bcrypt.hash(password, 10, async (error, hash) => {
            if (error) return res.status(406).json(error)
            return await connection('ngos').insert({
                id: id,
                login: login,
                password: hash,
                name: name,
                email: email,
                whatsapp: whatsapp,
                city: city,
                state: state
            }).then(_ => {
                return res.status(201).json({ id: id })
            }).catch(error => {
                return res.status(406).json(error)
            })
        })
    },
    
    async delete(req, res) {
        // get id from URL parameters
        const { id } = req.params

        // get ID from request's header
        const authId = req.headers.authorization

        // check authorization ID and ID from request
        if (!id || !authId || id.length !== 8 || authId.length !== 8) {
            return res.status(422).json({ error: 'Invalid id' })
        }
        
        // try to get the register's id from database table
        const ngo = await connection('ngos')
            .select('id')
            .where('id', id)
            .first() // get only the first value from returned array
        
        if (!ngo) return res.status(404).json({ error: `ID ${id} not found` })
        
        // check if ID from parameter, from header and from database are the same
        if ((ngo.id !== authId) || (id !== authId)) {
            // returns status 401 (unauthorized) and a JSON the with error message
            return res.status(401).json({ error: 'Unauthorized' })
        }

        // delete register from database where id's table is the same from URL
        await connection('ngos')
            .delete()
            .where('id', id)

        // returns no content status
        return res.status(410).json({ id: id })
    }
}
