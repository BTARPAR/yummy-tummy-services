import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'
import {generateDate, generateOrder} from "../utility";
import {RestaurantSchema} from "../models/restaurantModel";

const Order = mongoose.model('Orders', OrderSchema, 'orders')
const Restaurants = mongoose.model('Restaurants', RestaurantSchema, 'restaurants')

let ORDER_NO = 0

export const placeOrder = async (req, res) => {
    const {
        address: customerDetails, name,
        phonenumber, noOfPeople, restaurant_id
    } = req.body
    const {total, selected_items} = generateOrder(noOfPeople)

    const generateOrderNo = async () => {
        if (!ORDER_NO) {
            const getAllOrders = await Order.find({}).sort({_id: -1}).limit(1)
            if (!getAllOrders.length) {
                ORDER_NO = 100
            } else {
                ORDER_NO = getAllOrders[0].order_no
            }
            return ORDER_NO + 1
        } else {
            return ORDER_NO + 1
        }
    }


    const incomingOrder = {
        _id: new mongoose.Schema.Types.ObjectId(),
        customer_info: {
            address: {
                ...customerDetails,
                country: 'USA'
            },
            phone_number: phonenumber,
            name
        },
        total,
        order_no: await generateOrderNo(),
        selected_items,
        date: generateDate()
    }

    Restaurants.findOne({_id: restaurant_id}, (err, restaurant) => {
        if (err) {
            res.sendStatus(404).json('Restaurant is not available')
        }
        incomingOrder['restaurant_info'] = restaurant
        new Order(incomingOrder).save((err) => {
            if (err) {
                res.send(err)
            }
            ORDER_NO++
            res.status(201).json({
                message: 'Order Placed'
            })
        })
    })
}