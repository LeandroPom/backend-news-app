// models/Product.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
        {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            product_name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            product_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            product_img: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
};
