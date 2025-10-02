//models/Banner.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Banner",
    {
      // 🔹 Identificador único del banner
      banner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // 🔹 Nombre del banner (único o descriptivo)
      banner_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      // 🔹 Array de URLs de imágenes
      img: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Debe incluir al menos una imagen",
          },
        },
      },
      timer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      // 🔹 Timer opcional (con fechas de inicio y fin)
      timer_start: {
        type: DataTypes.DATE,
        allowNull: true, // Puede no usarse si el timer está inactivo
      },
      timer_end: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      // 🔹 Indica si el banner tiene prioridad sobre otros
      priority: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // 🔹 Controla si el banner está activo o no
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true, // Crea createdAt y updatedAt
      freezeTableName: true, // Evita pluralización
    }
  );
};
