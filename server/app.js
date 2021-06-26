const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUploder = require('express-fileupload')
    // app setup
const app = express();

// bodyParser setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


// // middleware setup
const middleware = [
    cors(),
    morgan('dev'),
    cookieParser('SECRET'),
    fileUploder()
]
app.use(middleware)

// import all routers
const user = require('./routers/userRoutes')
const admin = require('./routers/adminRoutes')
const product = require('./routers/productRoutes')
const order = require('./routers/orderRoute')

// use all routers
app.use('/api/user', user)
app.use('/api/products', product)
app.use('/api/order', order)
app.use('/api/admin', admin)


// exports app for listen server
module.exports = app