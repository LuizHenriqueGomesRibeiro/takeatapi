const { createRestaurant, loginRestaurant, getRestaurants } = require("../controllers/restaurant");
const { Router } = require("express");
const routes = Router();

routes.get('/restaurants', getRestaurants);
routes.post('/restaurants', createRestaurant);
routes.post('/login', loginRestaurant);

module.exports = routes;