// models/PurchaseItem.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("PurchaseItem", {
    purchase_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    unit_price_snapshot: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discount_percent_snapshot: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
