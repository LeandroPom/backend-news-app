const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Rating', {
    rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valueUp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    valueDown: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
