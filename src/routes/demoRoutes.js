import express from 'express';

import {signUpUser, userLogin, logoutUser} from "../controllers/userController";
import {checkAuth} from "../middleware/checkAuth";
import {getAllData, getOrder, updateOrder, addOrder, searchOrder} from "../controllers/orderController";
import {placeOrder} from "../controllers/placeOrderController";
import {getStatistics} from "../controllers/statisticsController";

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
    .post(logoutUser)

Router.route('/getOrders')
    // GET Contact By ID
    .get(checkAuth, getAllData)
    // UPDATE Contact By ID
    .put(checkAuth, addOrder)

Router.route('/getOrder')
    // GET order By ID
    .get(checkAuth, getOrder)
    .post(checkAuth, updateOrder)
Router.route('/search')
    // GET order By ID
    .get(checkAuth, searchOrder)
Router.route('/placeOrder')
    .post(placeOrder)
Router.route('/statistics')
    .get(checkAuth, getStatistics)


export default Router