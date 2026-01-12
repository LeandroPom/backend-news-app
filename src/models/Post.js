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

      /* 
      Campos virtuales para mostrar la cantidad de votos positivos y negativos.
      Estos valores se calculan dinámicamente a partir de la relación "Votes".
      */
      rating_positive: {
        type: DataTypes.VIRTUAL,
        get() {
          // Verificamos si la relación "Votes" fue incluida al consultar el Post
          const votes = this.getDataValue("Votes");
          if (!votes) return 0;

          // Contamos cuántos votos son "positive"
          return votes.filter((v) => v.vote_type === "positive").length;
        },
      },
      rating_negative: {
        type: DataTypes.VIRTUAL,
        get() {
          const votes = this.getDataValue("Votes");
          if (!votes) return 0;

          // Contamos cuántos votos son "negative"
          return votes.filter((v) => v.vote_type === "negative").length;
        },
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};
