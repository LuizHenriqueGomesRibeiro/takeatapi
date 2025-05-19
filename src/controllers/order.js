const { Order, Buyer, Product, Restaurant } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { amount, product_id, phone, name } = req.body;
        const restaurant_id = req.restaurant.id;

        if (!phone) {
            return res.status(400).json({ error: 'Informe o telefone do destinatário.' })
        }

        if (!amount || !product_id) {
            return res.status(400).json({ error: 'amount e product_id são obrigatórios.' });
        }

        const product = await Product.findOne({
            where: { id: product_id, restaurant_id, canceled_at: null }
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado para esse restaurante.' });
        }

        let buyer = await Buyer.findOne({ where: { phone } });

        if (!buyer) {
            buyer = await Buyer.create({
                name: name || null,
                phone,
                created_at: new Date()
            });
        } else {
            return res.status(400).json({ error: 'Já há um pedido corrente para este destinatário.' });
        }

        const restaurant = await Restaurant.findByPk(restaurant_id);

        const total_price = parseFloat(product.value) * amount;
        const total_service_price = restaurant.has_service_tax ? total_price * 0.1 : 0;

        const order = await Order.create({
            product_id,
            amount,
            total_price,
            total_service_price,
            restaurant_id,
            buyer_id: buyer.id,
            created_at: new Date(),
            canceled_at: null
        });

        return res.status(201).json({ order, buyer });
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno ao criar pedido.' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const restaurant_id = req.restaurant.id;
        const orders = await Order.findAll({
            where: { restaurant_id, canceled_at: null },
            include: [
                {
                    model: Buyer,
                    as: 'buyer',
                    attributes: ['id', 'name', 'phone', 'created_at']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        return res.json(orders);
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno ao buscar pedidos.' });
    }
}; 