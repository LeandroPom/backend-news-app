const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lead: {
      type: DataTypes.TEXT,
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
      allowNull: false, 
      defaultValue: 0
    }
  }, {
    timestamps: true,
    freezeTableName: true,
  });
};
