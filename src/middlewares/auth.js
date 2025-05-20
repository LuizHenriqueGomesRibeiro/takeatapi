const jwt = require('jsonwebtoken');
const { Restaurant } = require('../models');

const JWT_SECRET = "021ec2h8e8h2ce2h8mh2ce2eg72e2ecg2egc2beg27ceg2ec72gneiwd";

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const restaurant = await Restaurant.findByPk(decoded.id);

        if (!restaurant) {
        return res.status(401).json({ error: 'Restaurante não encontrado.' });
        }

        req.restaurant = restaurant;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};