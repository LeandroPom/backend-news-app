// models/Product.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    // 🔹 Stock real restante
    product_amount: {
      type: DataTypes.INTEGER,
      allowNull: true, // null si es ilimitado
    },

    is_unlimited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // 🔹 Descuento porcentual
    discount_percent: {
      type: DataTypes.FLOAT,
      defaultValue: 0, // ej: 10 = 10%
    },

    discount_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    description: DataTypes.STRING,
    product_img: DataTypes.STRING,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
