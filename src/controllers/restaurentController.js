import mongoose from 'mongoose'

import {RestaurantSchema} from "../models/restaurantModel";

const Restaurants = mongoose.model('Restaurants', RestaurantSchema, 'restaurants')


export const getAllRestaurants = async (req, res) => {

    Restaurants.find({}, (err, restaurants) => {
        if (err) {
            res.sendStatus(401).json('Restaurants are not available')
        }
        const response = restaurants.reduce((acc,curr) => {
            const restaurant = {
                name: curr.name,
                _id: curr._id
            }
            acc.push(restaurant)
            return acc
        },[])

        res.json(response)
    })
}