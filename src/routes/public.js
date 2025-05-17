const { Router } = require("express");
const { createRestaurant, loginRestaurant } = require("../controllers/restaurant");

const routes = Router();

routes.post('/restaurants', createRestaurant);
routes.post('/login', loginRestaurant);

module.exports = routes;