import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter First Name'
  },
  lastName: {
    type: String,
    required: 'Enter Last Name'
  },
  email: {
    type: String
  },
  phone_number: {
    type: Number
  },
  company: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now()
  }
})

export const AllMoviesSchema = new Schema({
  name: {
    type: String
  },
  season: {
    type: Number
  },
  number: {
    type: Number
  },
  type: {
    type: String
  },
  airdate: {
    type: String
  },
  airtime: {
    type: String
  },
  airstamp: {
    type: String
  },
  runtime: {
    type: Number
  }

})
