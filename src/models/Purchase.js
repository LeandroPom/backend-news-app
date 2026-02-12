// models/Purchase.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Purchase", {
    purchase_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    status: {
      type: DataTypes.ENUM("pending", "success", "failure", "expired"),
      defaultValue: "pending",
    },

    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "ARS",
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
