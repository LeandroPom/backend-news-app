// models/Post.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headLine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lead: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // Campos virtuales para ratings
      rating_positive: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.Votes) {
            return this.Votes.filter((v) => v.vote_type === "positive").length;
          }
          return 0;
        },
      },
      rating_negative: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.Votes) {
            return this.Votes.filter((v) => v.vote_type === "negative").length;
          }
          return 0;
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};
