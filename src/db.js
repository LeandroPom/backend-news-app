require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } = process.env;
const { Sequelize } = require("sequelize");

// Configuración para desarrollo y producción
const sequelize = NODE_ENV === "production"
  ? new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    native: false,
  })
  : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
  });
// Configura la conexión a la base de datos con Sequelize. Si el entorno es "producción", se configuran opciones adicionales para la conexión segura (SSL). En desarrollo, la conexión es más simple.

const basename = path.basename(__filename);
// Obtiene el nombre del archivo actual para evitar incluirlo luego al cargar modelos

const modelDefiners = [];
// Arreglo donde se almacenarán las definiciones de modelos (archivos .js)

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Lee todos los archivos en la carpeta 'models' y carga aquellos que no empiezan con un punto (.) y que sean archivos .js. Luego, los añade al arreglo modelDefiners.

modelDefiners.forEach(model => model(sequelize));
// Itera sobre todos los modelos cargados y los define en la instancia de sequelize

const { User, Post, Tag, PostMedia, PostVote, PostView, Banner } = sequelize.models;

/* =========================================================
   RELACIONES PRINCIPALES
   ========================================================= */

/* ------------------- USER ↔ POST -------------------
   Un usuario puede crear muchos posts (1:N)
   Cada post pertenece a un único usuario
------------------------------------------------------- */
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

/* ------------------- POST ↔ TAG --------------------
   Relación N:M entre posts y tags
   A través de la tabla intermedia 'PostTag'
------------------------------------------------------- */
Post.belongsToMany(Tag, { through: "PostTag", foreignKey: "post_id" });
Tag.belongsToMany(Post, { through: "PostTag", foreignKey: "tag_id" });

/* ------------------- POST ↔ POSTMEDIA ----------------
   Un post puede tener muchas media (1:N)
   Cada media pertenece a un único post
------------------------------------------------------- */
Post.hasMany(PostMedia, { foreignKey: "post_id" });
PostMedia.belongsTo(Post, { foreignKey: "post_id" });

/* ------------------- USER ↔ POSTVOTE -----------------
   Relación N:M para votos
   Un usuario puede votar muchos posts
   Un post puede tener muchos votos de usuarios
   Además se puede acceder a los votos de un post con 'Votes'
------------------------------------------------------- */
User.belongsToMany(Post, { through: PostVote, foreignKey: "user_id" });
Post.belongsToMany(User, { through: PostVote, foreignKey: "post_id" });

// Acceso directo a los votos de un post
Post.hasMany(PostVote, { foreignKey: "post_id", as: "Votes" });
PostVote.belongsTo(Post, { foreignKey: "post_id" });

/* ------------------- POST ↔ POSTVIEW -----------------
   Relación 1:N para controlar vistas
   Un post puede tener muchas vistas
   Una vista pertenece a un único post
   Un usuario puede tener muchas vistas (1:N)
------------------------------------------------------- */
Post.hasMany(PostView, { foreignKey: "post_id" });
PostView.belongsTo(Post, { foreignKey: "post_id" });

User.hasMany(PostView, { foreignKey: "user_id" });
PostView.belongsTo(User, { foreignKey: "user_id" });



module.exports = {
  ...sequelize.models, // Exporta todos los modelos creados en Sequelize
  conn: sequelize,     // Exporta la conexión a la base de datos
};
