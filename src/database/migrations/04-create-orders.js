'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            total_price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            total_service_price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'restaurants',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            buyer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'buyers',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('orders');
    }
};