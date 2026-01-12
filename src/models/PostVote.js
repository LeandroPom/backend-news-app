// models/PostVote.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
sequelize.define(
  "PostVote",
  {
    vote_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_type: {
      type: DataTypes.ENUM("positive", "negative"),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

};
