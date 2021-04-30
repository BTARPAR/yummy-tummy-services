import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const OrderSchema = new Schema({
    order_no: {
        type: Number,
        unique: true
    },
    customer_info: {
        address: {
            street: String,
            zipCode: String,
            city: String,
            state: String,
            country: String,
        },
        phone_number: String,
        name: String
    },
    restaurant_info: {
        address: {
            street: String,
            zipCode: String,
            city: String,
            state: String,
            country: String,
        },
        phone_number: String,
        name: String
    },
    selected_items: [
        {
            item_name: String,
            quantity: String,
            item_price: Number,
            foodType: String,
            spiceLevel: String
        }
    ],
    total: {
        type: Number
    },
    date: {
        type: String,
    }
})
