const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');

const server = express();

server.use(cors());
server.options('*', cors());

//Middlewares
server.use(express.json());
server.use(morgan('tiny'));
server.use(authJwt());
server.use(errorHandler);
server.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

server.use(`${api}/categories`, categoriesRoutes);
server.use(`${api}/products`, productsRoutes);
server.use(`${api}/users`, usersRoutes);
server.use(`${api}/orders`, ordersRoutes);


//DB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'eshop-database'
}).then(() => {
  console.log('db success');
}).catch((error) => {
  console.log('db fail', error);
});

server.listen(3000, () => {
  console.log('Server running at port 3000', api);
});