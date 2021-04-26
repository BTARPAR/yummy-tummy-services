import express from 'express';
import {
    updateContact,
    deleteContact
} from '../controllers/demoController'
import {signUpUser, userLogin} from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";
import {getAllData, getOrder, updateOrder} from "../controllers/orderController";

const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.send(`Node & Express Server ROUTE /`)
    })

Router.route('/signup')
    .post((req, res, next) => {
        // middleware
        console.log(`Request from : ${req.originalUrl}`)
        console.log(`Request type : ${req.method}`)
        next()
    }, signUpUser)

Router.route('/login')
    // POST : Create new Contact
    // .get(userLogin)
    .post(userLogin)

Router.route('/logout')
    // UPDATE Contact By ID
    .post(updateContact)

Router.route('/getOrders')
    // GET Contact By ID
    .get(checkAuth, getAllData)
    // UPDATE Contact By ID
    .put(checkAuth, updateContact)
    // DELETE Contact by ID
    .delete(deleteContact)

Router.route('/getOrder')
    // GET order By ID
    .get(checkAuth, getOrder)
    .post(checkAuth, updateOrder)


module.exports = Router