import mongoose from "mongoose";
import {StatisticsSchema} from "../models/statsticsModel";

const Statistics = mongoose.model('Statistics', StatisticsSchema, 'statistics')


export const increaseRevenueCounter = (req, res) => {
    Statistics.findByIdAndUpdate('tummy_yummy', {
            total_orders: 0,
            $inc: {total_orders: 1,}
        },
        {
            upsert: true
        }, (err, update) => {
            if (err) {
                res.sendStatus('304').json({
                    message: 'not increased'
                })
            }
        }
    )
}

export const increaseRestaurantCounter = () => {
    Statistics.findByIdAndUpdate('tummy_yummy', {
            available_restaurants: 0,
            $inc: {available_restaurants: 1,}
        },
        {
            upsert: true
        }
    )
}

export const increaseUsersCounter = () => {
    Statistics.findByIdAndUpdate('tummy_yummy', {
            total_users: 0,
            $inc: {total_users: 1,}
        },
        {
            upsert: true
        }
    )
}
