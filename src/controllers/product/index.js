const { Product } = require('../../models');

exports.createProduct = async (req, res) => {
  const { name, value } = req.body;
  const restaurant_id = req.restaurantId;

  const existing = await Product.findOne({ where: { name, restaurant_id } });

  if (existing) {
    return res.status(400).json({ error: 'Produto com esse nome já existe para esse restaurante' });
  }

  const product = await Product.create({ name, value, restaurant_id });
  res.status(201).json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({ where: { restaurant_id: req.restaurantId } });
  res.json(products);
};