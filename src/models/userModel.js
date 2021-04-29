import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter First Name'
    },
    lastName: {
        type: String,
        required: 'Enter Last Name'
    },
    email: {
        type: String,
        required: true,
        // A common gotcha is that the unique option tells Mongoose to define a unique index.
        // That means Mongoose does not check uniqueness when you use validate()
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})