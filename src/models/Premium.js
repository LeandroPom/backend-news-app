// models/Premium.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Premium",
    {
      premium_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // 🔒 1:1
      },

      expiration_date: {
        type: DataTypes.DATE,
        allowNull: false, // siempre debe existir
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id"],
        },
      ],
    }
  );
};
