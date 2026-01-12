// models/Favorite.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      favorite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["post_id", "user_id"], // 🔒 asegura que un user solo tenga una favorite por post
        },
      ],
    }
  );
};
