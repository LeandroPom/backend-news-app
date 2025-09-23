const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    headLine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lead: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    conclusion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rating_positive: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rating_negative: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
