const User = require('../models/User')
const bcrypt = require('bcrypt')


class AuthController {
    async register(req, res) {
        const {username, email, password} = req.body

        console.log(req.body)

        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = await new User({
                username,
                email,
                password: hashedPassword
            }).save()

            res.status(200).json(user)
        } catch (err) {
            res.json(err)
        }
    }
    
    async login(req, res) {
        const {email, password} = req.body
        
        try {
            const user = await User.findOne({
                email: email
            })
            !user && res.status(404).json('User doesn\'t exist')

            const validPassword = await bcrypt.compare(password, user.password)
            !validPassword && res.status(404).json('Wrong password')

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = new AuthController()