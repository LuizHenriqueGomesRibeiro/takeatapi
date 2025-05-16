const { SECRET } = require('../../middleware/auth');
const { Restaurant } = require('../../models/restaurants');
        
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, phone, address, has_service_tax } = req.body;
  const exists = await Restaurant.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
  
  if (exists) {
    return res.status(400).json({ error: 'Restaurante com esse username ou email já existe' });
  }

  const restaurant = await Restaurant.create({ username, email, password, phone, address, has_service_tax });

  const { password: _, ...rest } = restaurant.toJSON();
  res.status(201).json(rest);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const restaurant = await Restaurant.findOne({ where: { email } });
  if (!restaurant || restaurant.password !== password) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: restaurant.id }, SECRET, { expiresIn: '1d' });

  const { password: _, ...rest } = restaurant.toJSON();
  res.json({ ...rest, token });
};
