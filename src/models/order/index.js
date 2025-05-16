// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_service_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'orders',
    timestamps: false,
    underscored: true,
  });

  return Order;
};
