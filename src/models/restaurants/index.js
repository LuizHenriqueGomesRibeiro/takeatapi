module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    has_service_tax: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
        tableName: 'restaurants',
        timestamps: false,
        underscored: true,
  });

  return Restaurant;
};