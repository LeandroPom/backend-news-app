const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Tag', {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
