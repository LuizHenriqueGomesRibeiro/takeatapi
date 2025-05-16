const { Order, Product, Buyer } = require('../../models');

exports.createOrder = async (req, res) => {
  const { amount, product_id, phone, name } = req.body;
  const restaurant_id = req.restaurantId;

  const product = await Product.findByPk(product_id);
  if (!product || product.restaurant_id !== restaurant_id) {
    return res.status(400).json({ error: 'Produto inválido ou não pertence a esse restaurante' });
  }

  let buyer = await Buyer.findOne({ where: { phone } });
  if (!buyer) {
    buyer = await Buyer.create({ phone, name });
  }

  const total_price = amount * product.value;
  const total_service_price = product.value * (req.restaurantHasTax ? 0.1 : 0); // opcional

  const order = await Order.create({
    amount,
    product_id,
    total_price,
    total_service_price,
    restaurant_id,
    buyer_id: buyer.id,
  });

  res.status(201).json({ order, buyer });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { restaurant_id: req.restaurantId },
    include: [{ model: Buyer, as: 'buyer' }],
  });

  res.json(orders);
};
