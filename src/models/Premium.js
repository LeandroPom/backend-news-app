// models/Premium.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Premium", {
    premium_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    is_banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    applied_purchase_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
