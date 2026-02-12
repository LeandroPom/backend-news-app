// models/Payment.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Payment", {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    mp_payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mp_preference_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mp_status: {
      type: DataTypes.STRING,
    },

    transaction_amount: {
      type: DataTypes.FLOAT,
    },

    raw_response: {
      type: DataTypes.JSONB,
    },
  });
};
