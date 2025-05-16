const { Router } = require("express");
const { register, login } = require("../controllers/auth");

const routes = Router();

routes.post('/restaurants', register);
routes.post('/login', login);

module.exports = routes;