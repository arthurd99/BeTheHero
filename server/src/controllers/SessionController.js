// importing module dependencies
const { validationResult } = require("express-validator")
const connection = require("../database/connection")
const bcrypt = require("bcryptjs")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        // get login, password and error list from body's request
        const { login, password } = req.body
        const { errors } = validationResult(req)
        
        // check whether there are errors in request
        if (errors.length) return res.status(422).json(errors)

        // select login and password from database
        await connection('ngos')
            .select('login', 'password')
            .where({ login: login })
            .first() // gets only the first result
            .then(loginInfo => {
                if (!loginInfo) return res.json({ error: 'User nor registered' })
                // decrypt password from database and compare with request's one
                bcrypt.compare(password, loginInfo['password'], async (error, isEqual) => {
                    if (error) return res.json(error)
                    if (!isEqual) return res.json({ error: 'Login or password does not match' })

                    // try to get registers from "ngo" table
                    const ngo = await connection('ngos')
                        .select()
                        .where({ login: login })
                        .first() // get only the first value from returned array

                    // check if it were returned any registers
                    if (ngo) {
                        return res.status(200).json(ngo)
                    } else {
                        return res.status(400).json({ error: 'User not found' })
                    }
                })
            }
        )
    }
}
