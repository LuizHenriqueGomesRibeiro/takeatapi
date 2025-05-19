const { Buyer } = require('../models');

exports.createBuyer = async (req, res) => {
    try {
        const { phone, name } = req.body;

        if (!phone) {
            return res.status(400).json({ error: 'O telefone é obrigatório.' });
        }

        let buyer = await Buyer.findOne({ where: { phone } });

        if (buyer) {
            return res.status(200).json(buyer);
        }

        buyer = await Buyer.create({
            phone,
            name: name || null,
            created_at: new Date()
        });

        return res.status(201).json(buyer);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar comprador.' });
    }
};


exports.getBuyers = async (req, res) => {
    try {
        const buyers = await Buyer.findAll({
            order: [['created_at', 'DESC']]
        });

        return res.json(buyers);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar compradores.' });
    }
};
