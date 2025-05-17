const { Restaurant } = require("../models");
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '021ec2h8e8h2ce2h8mh2ce2eg72e2ecg2egc2beg27ceg2ec72gneiwd';

exports.createRestaurant = async (req, res) => {
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
}

exports.loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const restaurant = await Restaurant.findOne({ where: { email } });

    if (!restaurant) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const senhaConfere = restaurant.password === password;

    if (!senhaConfere) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const { password: _, ...restaurantData } = restaurant.toJSON();

    const token = jwt.sign(
      { id: restaurant.id, email: restaurant.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ restaurant: restaurantData, token });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno no servidor.', message: err });
  }
}