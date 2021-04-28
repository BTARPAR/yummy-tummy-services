import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'

const Orders = mongoose.model('Orders', OrderSchema, 'orders')

export const getStatistics = (req, res) => {
    Orders.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$total"
                },
                count: {
                    $sum: 1
                },

            },
        }
    ], (err, order) => {
        if (err) return res.send(err)
        Orders.aggregate([
            {
                $group: {
                    _id: "$customer_info.phone_number",
                    count: {
                        $sum: 1
                    },

                },
            }
        ], (err, users) => {
            if (err) return res.send(err)
            res.json({revenue: order[0].total, orders: order[0].count, users: users.length})
        })
    })
}
