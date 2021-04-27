import mongoose from 'mongoose'

import {OrderSchema} from '../models/orderModel'
import {generateDate, generateOrder} from "../utility";
import {RestaurantSchema} from "../models/restaurantModel";
import {increaseRevenueCounter} from "./statisticsController";

const Order = mongoose.model('Orders', OrderSchema, 'orders')
const Restaurants = mongoose.model('Restaurants', RestaurantSchema, 'restaurants')

export const placeOrder = (req, res) => {
    const {
        address: customerDetails, name,
        phonenumber, noOfPeople, restaurant_id
    } = req.body
    const {total, selected_items} = generateOrder(noOfPeople)

    const incomingOrder = {
        _id: mongoose.Types.ObjectId(),
        customer_info: {
            address: {
                ...customerDetails,
                country: 'USA'
            },
            phone_number: phonenumber,
            name
        },
        total: '$' + total,
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
            // increaseRevenueCounter(req, res)
            res.status(201).json({
                message: 'Order Placed'
            })
        })
    })
}