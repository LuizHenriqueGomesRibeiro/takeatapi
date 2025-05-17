const { Product } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        const { name, value } = req.body;
        const restaurant_id = req.restaurant.id;

        if (!name || value == null) {
            return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
        }

        const existingProduct = await Product.findOne({
            where: { name, restaurant_id }
        });

        if (existingProduct) {
            return res.status(409).json({
                error: `Já existe um produto com o nome '${name}' para este restaurante.`
            });
        }

        const newProduct = await Product.create({
            name,
            value,
            restaurant_id,
            created_at: new Date()
        });

        return res.status(201).json(newProduct);
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno ao criar produto.' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const restaurant_id = req.restaurant.id;
        const products = await Product.findAll({
            where: { restaurant_id, canceled_at: null },
            order: [['created_at', 'DESC']]
        });

        return res.json(products);
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
    }
};