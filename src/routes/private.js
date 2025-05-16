const { Router } = require("express");
const { createProduct, getAllProducts } = require("../controllers/product");
const { createOrder, getOrders } = require("../controllers/order");
const { authMiddleware } = require("../middleware/auth");

const routes = Router();

routes.use(authMiddleware);

routes.post('/products', createProduct);
routes.get('/products', getAllProducts);

routes.post('/orders', createOrder);
routes.get('/orders', getOrders);

module.exports = routes;