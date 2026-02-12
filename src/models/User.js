//models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    editor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // // 👇 NUEVAS PROPIEDADES
    // success_purchase: {
    //   type: DataTypes.JSONB,
    //   allowNull: false,
    //   defaultValue: []
    // },
    // pending_purchase: {
    //   type: DataTypes.JSONB,
    //   allowNull: false,
    //   defaultValue: []
    // },
    // failure_purchase: {
    //   type: DataTypes.JSONB,
    //   allowNull: false,
    //   defaultValue: []
    // }

  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
