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
      allowNull: true // URL de la imagen
    }
  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
