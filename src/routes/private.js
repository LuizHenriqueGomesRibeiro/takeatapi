const { createProduct, getProducts } = require("../controllers/product");
const { createOrder, getOrders } = require("../controllers/order");

const { Router } = require("express");
const routes = Router();

routes.post('/products', createProduct);
routes.get('/products', getProducts);
routes.post('/orders', createOrder);
routes.get('/orders', getOrders);

module.exports = routes;