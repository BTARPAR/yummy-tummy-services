import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'

const Orders = mongoose.model('Orders', OrderSchema, 'orders')

export const getAllData = (req, res) => {
    Orders.find({}, (err, movies) => {
        if (err) {
            res.send(err)
        }
        res.json(movies)
    })
}

export const getOrder = (req, res) => {
    Orders.findById(req.query.id, (err, order) => {
        if (err) {
            res.send(err)
        }
        res.json(order)
    })
}

export const updateOrder = (req, res) => {
    const {_id, ...rest} = req.body
    Orders.findOneAndUpdate({_id: req.query.id}, rest, {returnNewDocument: true}, (err, foundOrder) => {

        if (err) {
            res.send(err)
        }

        res.json(foundOrder)
    })
}
