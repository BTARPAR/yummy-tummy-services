import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const StatisticsSchema = new Schema({
    _id: mongoose.Types.ObjectId(),
    total_users: {
        type: Number,
    },
    total_orders: {
        type: Number,
    },
    available_restaurants: {
        type: Number,
    },
})