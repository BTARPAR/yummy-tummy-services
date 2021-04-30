import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'

const Orders = mongoose.model('Orders', OrderSchema, 'orders')

export const getStatistics = async (req, res) => {
    await Orders.aggregate([
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
            
            if (!order.length) {
                res.json({revenue: 0, orders: 0, users: 0})
            } else {
                res.json({revenue: order[0].total, orders: order[0].count, users: users.length})
            }
        })
    })
}
