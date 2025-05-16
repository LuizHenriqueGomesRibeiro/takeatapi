const { Restaurant } = require("./models");
const { Router } = require("express");
const { Op } = require('sequelize');

const routes = Router();

routes.post('/restaurants', async (req, res) => {
  try {
    const { username, email, password, phone, address, has_service_tax } = req.body;

    const existing = await Restaurant.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Restaurante com este username ou email já existe.' });
    }

    const restaurant = await Restaurant.create({
      username,
      email,
      password,
      phone,
      address,
      has_service_tax
    });

    const { password: _, ...restaurantData } = restaurant.toJSON();

    return res.status(201).json(restaurantData);

  } catch (error) {
    console.error('Erro ao criar restaurante:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

module.exports = routes;