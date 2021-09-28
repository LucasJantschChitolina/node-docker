const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body
    
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })
        req.session.user = newUser;
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({ status: 'error'})
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username: username })
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            req.session.user = user;
            console.log(req.session)
            return res.status(200).json({
                status: 'success',
                data: {
                    user: user.username
                }
            })
        } else {
            return res.status(401).json({ status: 'unauthorized user'})
        }
    } catch (err) {
        res.status(400).json({ status: 'error'})
    }
}

