import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import demoRoutes from './src/routes/demoRoutes'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

// mongoose connection

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yummy-tummy-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// body parser set up
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/', demoRoutes)

app.listen(PORT, () =>{
    console.log('Your Server is UP')
})