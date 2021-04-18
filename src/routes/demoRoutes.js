import express from 'express';
import {
    getContactByID,
    updateContact,
    deleteContact
} from '../controllers/demoController'
import {signUpUser, userLogin} from "../controllers/userController";
import checkAuth from "../middleware/checkAuth";

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

Router.route('/data')
    // GET Contact By ID
    .get(checkAuth, getContactByID)
    // UPDATE Contact By ID
    .put(updateContact)
    // DELETE Contact by ID
    .delete(deleteContact)

module.exports = Router