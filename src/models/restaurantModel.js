import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const RestaurantSchema = new Schema({
    address: {
        street: String,
        zipCode: String,
        city: String,
        state: String,
        country: String,
    },
    phone_number: String,
    name: String
})