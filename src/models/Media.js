const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Media', {
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
