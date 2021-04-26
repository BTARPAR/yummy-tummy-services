import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    order_no: {
        type: String,
    },
    customer_info: {
        "address": {
            "street": String,
            "zipCode": String,
            "city": String,
            "state": String,
            "country": String,
        },
        "phone_number": String,
        "name": String
    },
    restaurant_info: {
        "address": {
            "street": String,
            "zipCode": String,
            "city": String,
            "state": String,
            "country": String,
        },
        "phone_number": String,
        "name": String
    },
    selected_items: [
        {
            _id: Schema.Types.ObjectId,
            "item_name": String,
            "price": String,
            "quantity": String,
            "foodType": String,
            "spiceLevel": String
        }
    ],
    total: {
        type: String
    },
    date: {
        type: String,
    }
})