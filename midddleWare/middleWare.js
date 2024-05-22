
import bcrypt from 'bcrypt'
import { userModel } from '../config/models.js'


// middleware for checkif email exist or not 

export const checkEmail = async (req, res, next) => {

    const data = await userModel.findOne({ where: { email: req.body.email } })
    if (data !== null) return res.status(409).send({ message: "email is already exist" })
    // hashing password
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}