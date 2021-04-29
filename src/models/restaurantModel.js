import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const RestaurantSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
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