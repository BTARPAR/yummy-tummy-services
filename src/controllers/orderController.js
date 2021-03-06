import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'

const Orders = mongoose.model('Orders', OrderSchema, 'orders')

export const getAllData = (req, res) => {
    Orders.find({}, (err, orders) => {
        if (err) {
            res.send(err)
        }
        res.json(orders)
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
    const {_id, selected_items, ...body} = req.body
    const updateTotal = selected_items.reduce((acc, curr) => {
        acc += curr.quantity * curr.item_price
        return acc
    }, 0)
    const rest = {...body, total: updateTotal, selected_items}
    if (selected_items.length === 0) {
        Orders.findOneAndDelete({_id: req.query.id}, (err) => {

            if (err) {
                res.send(err)
            }

          return res.status(204).json({message: "DELETED"})
        })
    } else {
        Orders.findOneAndUpdate({_id: req.query.id}, rest, {returnNewDocument: true}, (err, foundOrder) => {

            if (err) {
                res.send(err)
            }

           return res.json(foundOrder)
        })
    }
}

export const addOrder = (req, res) => {
    const {_id, ...rest} = req.body
    Orders.findOneAndUpdate({_id: req.query.id}, rest, {returnNewDocument: true}, (err, foundOrder) => {

        if (err) {
            res.send(err)
        }

        res.json(foundOrder)
    })
}

export const searchOrder = (req, res) => {
    Orders.find({order_no: req.query.id}, (err, movies) => {
        if (err) {
            res.send(err)
        }
        res.json(movies)
    })
}