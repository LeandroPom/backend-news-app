const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('PostMedia', {
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
