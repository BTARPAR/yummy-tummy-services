import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {UserSchema} from '../models/userModel'

const User = mongoose.model('User', UserSchema, 'users')

export const signUpUser = (req, res) => {
    const {password, email, ...rest} = req.body
    User.find({email}, (err, foundUser) => {
        if (err) {
            return res.send(err)
        }

        if (!!foundUser.length) {
            return res.status(409).json({
                message: 'email is already taken'
            })
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            const newUser = new User({
                _id: mongoose.Types.ObjectId(),
                password: hash,
                email,
                ...rest
            })

            newUser.save((err) => {
                if (err) {
                    res.send(err)
                }
                res.status(201).json({
                    message: 'User created successfully'
                })
            })
        })
    })
}

export const userLogin = (req, res) => {
    const {password, email} = req.body
    User.find({email}, (err, user) => {
        if (err) {
            return res.send(err)
        }
        if (!user.length) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        const {email, password: userPassword, _id} = user[0]

        bcrypt.compare(password, userPassword, (err, result) => {
            if (result) {
                const token = jwt.sign({
                    email,
                    _id
                }, 'secrete', {
                    expiresIn: '1h'
                })

                res.cookie('token', token, {
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    secure: false, // set to true if your using https
                    httpOnly: true
                })
                return res.status(201).send()
            }

            return res.status(401).json({
                message: 'Unauthorized'
            })

        })
    })
}

export const logoutUser = (req, res) => {
    res.clearCookie('token').send()
}