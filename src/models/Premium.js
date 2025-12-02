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
                unique: true,  // 🔒 Garantiza 1:1 desde el modelo
            },

            pay_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW, // 🕒 Guarda la fecha de creación automáticamente
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
            indexes: [
                {
                    unique: true,
                    fields: ["user_id"], // 🔒 Garantiza que un USER solo tenga un PREMIUM
                },
            ],
        }
    );
};
