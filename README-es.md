📦 package.json — Configuración de entorno y dependencias
📁 Ubicación: Server/package.json
📌 Resumen:
Archivo raíz de configuración del entorno del backend del proyecto. Define el nombre, versión, scripts y dependencias necesarias para ejecutar y mantener el servidor Express de una aplicación de noticias con funcionalidades interactivas (usuarios, comentarios, votos, medios).

📖 Cuerpo (Descripción técnica y didáctica)
El archivo package.json es un componente esencial del ecosistema Node.js. En este proyecto, cumple múltiples funciones:

🛠️ Funciones principales
Definición del proyecto

"name": Identifica el nombre del paquete como news-website-backend.

"version": Asigna una versión actual del backend, útil para control de versiones y despliegues.

Descripciones y metadatos

"description": Proporciona un resumen funcional del backend: soporte de usuarios, comentarios, votos, reacciones, y medios.

"author" y "license": Información sobre el propietario y el tipo de licencia (ISC en este caso).

Punto de entrada

"main": "index.js" indica que el archivo raíz del servidor es index.js.

Scripts disponibles

json
Copy
Edit
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}
"start": Ejecuta la aplicación en modo producción con Node.js.

"dev": Ejecuta en modo desarrollo con nodemon para recarga automática al detectar cambios.

"test": Ejecuta la suite de tests definidos mediante Jest.

📚 Dependencias
🔧 Dependencias en producción (dependencies)
Paquete	Versión	Propósito
axios	^1.6.0	Cliente HTTP para consumir APIs externas.
bcrypt	^6.0.0	Hashing de contraseñas y verificación de autenticación segura.
dotenv	^16.3.1	Carga de variables de entorno desde .env al entorno process.env.
express	^4.18.2	Framework de backend para manejar rutas, middlewares y lógica HTTP.
morgan	^1.10.0	Middleware para logging de peticiones HTTP.
pg	^8.11.0	Cliente PostgreSQL para Node.js.
pg-hstore	^2.3.4	Serialización de datos JSON en PostgreSQL (usado con Sequelize).
sequelize	^6.37.3	ORM para manejar modelos, migraciones y queries a la base de datos.

🧪 Dependencias de desarrollo (devDependencies)
Paquete	Versión	Propósito
jest	^29.7.0	Framework de testing para pruebas unitarias y de integración.
nodemon	^3.0.1	Recarga automática del servidor durante desarrollo.

🧪 Muestras
A continuación, se muestra cómo ejecutar los scripts disponibles desde la terminal:

bash
Copy
Edit
# Iniciar el servidor en producción
npm start

# Iniciar el servidor en desarrollo con reinicios automáticos
npm run dev

# Ejecutar tests con Jest
npm test
⛔ Errores
Este archivo en sí no genera errores directos, pero algunos errores comunes asociados pueden incluir:

Código	Descripción	Causa probable
MODULE_NOT_FOUND	Falta alguna dependencia mencionada.	No se ejecutó npm install.
Error: Cannot find module 'dotenv'	El entorno no carga variables.	Falta de instalación o error en importación.
EACCES / EPERM	Permisos denegados al correr scripts.	Error en permisos de sistema operativo.
Unexpected token o SyntaxError	Error en index.js o archivo relacionado.	Código mal escrito o inválido.

🧩 Dependencias relacionadas
index.js: archivo raíz del servidor (debe estar ubicado en la raíz del directorio Server/).

.env: archivo de configuración con claves, puertos, tokens, etc.

controllers/: carpeta sugerida para lógica de rutas.

models/: modelos definidos por Sequelize.

routes/: agrupación de endpoints HTTP.

tests/: archivos de pruebas unitarias (recomendado para usar con Jest).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧠 Documentación Técnica - Archivo index.js
📁 Ubicación: Server/index.js
📌 Resumen:
Archivo principal de arranque del backend. Establece la conexión con la base de datos PostgreSQL a través de Sequelize y lanza el servidor HTTP de la aplicación Express. El puerto está fijado en 3001.

📖 Cuerpo (Descripción técnica y didáctica)
El archivo index.js tiene como responsabilidad central inicializar el servidor del proyecto y sincronizar la base de datos usando Sequelize. Su estructura sigue un flujo secuencial y controlado de inicialización, ideal para entornos de desarrollo y pruebas.

🔩 Componentes y estructura
js
Copy
Edit
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
axios: importado pero no utilizado directamente en este archivo. Puede ser requerido por otras partes del sistema global.

server: importa la instancia de servidor Express definida en src/server.js.

conn: instancia de conexión Sequelize configurada en src/db.js.

PORT: puerto donde se expone el backend localmente.

🚀 Flujo de ejecución
js
Copy
Edit
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
Sincronización de la base de datos:

conn.sync({ force: true }): fuerza la recreación de todas las tablas definidas en los modelos Sequelize.
⚠️ Esto elimina y vuelve a crear todas las tablas al iniciar — ideal para pruebas o desarrollo, pero no para producción.

Inicio del servidor:

Una vez sincronizada la base de datos, se llama a server.listen() que inicia el servidor Express en el puerto definido (3001).

Se imprime un mensaje de éxito en consola si todo ha salido bien.

En caso de error, el catch() lo imprime con console.error().

🧪 Muestras
Si se desea probar el correcto funcionamiento del backend:

bash
Copy
Edit
# Comando desde la raíz del proyecto
npm run dev
Salida esperada en consola:

nginx
Copy
Edit
Server listening on port 3001
Y si hay un error de conexión a la base de datos:

pgsql
Copy
Edit
SequelizeConnectionError: password authentication failed for user "postgres"
⛔ Errores
Código o Log	Causa posible	Acción sugerida
SequelizeConnectionError	Fallo al conectarse a la base de datos	Verificar .env, credenciales o estado del servicio PostgreSQL
server.listen is not a function	Importación incorrecta de server	Asegurar que src/server.js exporta correctamente una instancia Express
force: true elimina las tablas	Uso intencional pero destructivo	Solo usar en desarrollo; quitar para ambientes productivos

🧩 Dependencias
src/server.js: Define y exporta la instancia de servidor Express.

src/db.js: Configura Sequelize, define conexión y carga modelos.

.env: Archivo esperado para contener configuraciones de base de datos (usuario, contraseña, host, etc.).

models/: Carpeta que contiene los modelos Sequelize sincronizados por conn.sync().

-------------------------------------------------------------------------------------------------------------------------------------------------------

🌐 Configuración del Servidor HTTP - server.js
📁 Ubicación: Server/src/server.js
📌 Resumen:
Archivo que define y configura la instancia principal de servidor HTTP utilizando Express.js. Integra middlewares esenciales, logging con Morgan y la capa de ruteo central de la aplicación.

📖 Cuerpo (Descripción técnica y didáctica)
Este archivo es el núcleo funcional del servidor Express, donde se configura el middleware, se definen los formatos de entrada/salida y se incorpora el sistema de rutas. La instancia generada aquí es exportada y luego inicializada desde index.js.

🔧 Estructura del archivo
js
Copy
Edit
const express = require("express");
const router = require("./routes");
const morgan = require("morgan");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use(router);

module.exports = server;
🛠️ Componentes detallados
1. Instanciación de Express
js
Copy
Edit
const server = express();
Se crea una nueva instancia del servidor Express que será utilizada para manejar todas las solicitudes HTTP entrantes.

2. Middleware de logging con Morgan
js
Copy
Edit
server.use(morgan("dev"));
Se utiliza el middleware morgan en modo "dev" para mostrar en consola los logs detallados de cada petición HTTP (método, ruta, estado, tiempo de respuesta).

Esto es útil para debugging y desarrollo, permitiendo rastrear solicitudes en tiempo real.

3. Middleware para parseo de JSON
js
Copy
Edit
server.use(express.json());
Habilita el parseo automático de cuerpos de solicitud en formato application/json.

Permite a los endpoints recibir y manejar objetos JSON sin configuración adicional.

4. Integración de rutas
js
Copy
Edit
server.use(router);
Se importa e integra el archivo routes/index.js (se espera que este sea un enrutador Express válido).

Este router agrupa todos los endpoints organizados del backend (usuarios, publicaciones, comentarios, etc.).

5. Exportación
js
Copy
Edit
module.exports = server;
Exporta la instancia del servidor para ser utilizada por index.js (archivo que realiza el listen() en un puerto específico).

🧪 Muestras
No aplica en este archivo ya que no define rutas ni lógica de negocio directamente. Sin embargo, se puede probar su correcto funcionamiento indirectamente desde index.js:

bash
Copy
Edit
npm run dev
Y verificar en consola que las peticiones HTTP son registradas:

bash
Copy
Edit
GET /api/posts 200 12.3 ms - 482
⛔ Errores
Este archivo por sí mismo no define errores, pero pueden derivarse errores si no están correctamente integradas sus dependencias. Aquí algunos ejemplos comunes:

Mensaje de error	Causa probable	Solución sugerida
Cannot find module './routes'	Falta el archivo routes/index.js o error en la ruta	Verificar que el archivo exista y esté correctamente exportado
TypeError: router is not a function	./routes no exporta un objeto Router de Express	Asegurar que routes/index.js use express.Router() y lo exporte
SyntaxError: Unexpected token	Código mal formateado o uso incorrecto de JSON	Revisar la estructura del JSON enviado en las peticiones

🧩 Dependencias
Archivo o paquete	Rol
express	Framework principal del servidor HTTP
morgan	Middleware para logs HTTP
./routes	Capa de ruteo central que gestiona los endpoints del backend
index.js	Archivo que importa esta instancia de servidor y lanza el servicio en un puerto específico

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🗄️ Configuración de la base de datos y modelos – db.js
📁 Ubicación: Server/src/db.js
📌 Resumen:
Archivo encargado de establecer la conexión a la base de datos PostgreSQL mediante Sequelize. Carga dinámicamente todos los modelos del proyecto, define relaciones entre ellos y exporta tanto los modelos como la instancia de conexión para ser utilizados en el backend.

📖 Cuerpo (Descripción técnica y didáctica)
Este archivo centraliza la configuración de Sequelize, encargándose de:

Crear una conexión segura con la base de datos, adaptándose según el entorno (development o production).

Cargar automáticamente todos los modelos definidos en la carpeta /models.

Aplicar las relaciones entre entidades (1:N, N:M).

Exportar tanto la instancia de conexión como los modelos para uso en el servidor y controladores.

🔌 1. Conexión con la base de datos
js
Copy
Edit
const sequelize = NODE_ENV === "production"
  ? new Sequelize({ ... })
  : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { ... });
Utiliza variables de entorno (.env) para acceder a credenciales sensibles (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME).

En modo producción, se establece una conexión segura mediante SSL.

En modo desarrollo, la conexión es directa, más simple y sin SSL.

La opción logging: false desactiva los logs de SQL en consola para mayor limpieza.

📂 2. Carga dinámica de modelos
js
Copy
Edit
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(...)
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
Se explora automáticamente la carpeta /models, filtrando archivos .js válidos.

Se evita cargar el mismo archivo db.js al comprobar su basename.

Los modelos se definen posteriormente sobre la instancia de sequelize con:

js
Copy
Edit
modelDefiners.forEach(model => model(sequelize));
🧱 3. Definición de relaciones entre modelos
js
Copy
Edit
const { User, Post, Rating, Tag, Media } = sequelize.models;
A continuación, se detallan las relaciones implementadas:

🔁 Relaciones Uno a Muchos (1:N)
User → Post: Un usuario puede tener múltiples publicaciones.

Post → Media: Una publicación puede tener múltiples archivos multimedia.

User → Rating: Un usuario puede emitir muchas calificaciones.

Post → Rating: Una publicación puede tener muchas calificaciones.

🔗 Relaciones Muchos a Muchos (N:M)
Post ⇄ Tag: Una publicación puede tener múltiples etiquetas, y una etiqueta puede aplicarse a múltiples publicaciones.
Esto se implementa mediante una tabla intermedia llamada PostTag, sin timestamps.

📦 4. Exportaciones
js
Copy
Edit
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
Se exportan todos los modelos definidos (desestructurados) para facilitar el require selectivo.

También se exporta conn para sincronizar o manipular la base de datos desde otros módulos (como index.js).

🧪 Muestras
Este archivo no expone rutas directamente, pero su impacto puede verificarse mediante la sincronización del servidor:

bash
Copy
Edit
npm run dev
Resultado esperado en consola (si los modelos y relaciones están bien definidos):

nginx
Copy
Edit
Server listening on port 3001
Y en la base de datos (usando pgAdmin, TablePlus o similar), se espera encontrar:

Tablas: Users, Posts, Media, Ratings, Tags, PostTag

Relaciones correctamente creadas con claves foráneas.

⛔ Errores
Mensaje de error	Descripción	Posible solución
SequelizeConnectionError	Error de conexión a la base de datos	Verificar credenciales .env y que PostgreSQL esté activo
Model is not a function	Un archivo en /models no exporta una función válida	Asegurarse de que cada archivo de modelo exporte una función que reciba sequelize como argumento
relation "posttag" does not exist	Error en tabla intermedia de relación N:M	Verificar relaciones y que las tablas hayan sido sincronizadas
Unexpected token	Error de sintaxis en un modelo	Corregir estructura del archivo en /models

🧩 Dependencias
Recurso	Función
.env	Variables de entorno (credenciales DB, modo producción, etc.)
Sequelize	ORM que gestiona la conexión, modelos y relaciones
/models/*.js	Archivos que definen las entidades del sistema
Server/index.js	Punto de arranque que usa conn.sync() para inicializar la DB
pg, pg-hstore	Drivers requeridos por Sequelize para PostgreSQL (definidos en package.json)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 Modelo de Usuario
📌 Ubicación
src/models/User.js

🧩 Resumen técnico
Este archivo define el modelo User utilizando Sequelize, representando la tabla de usuarios del sistema. Su objetivo es estructurar y validar la información básica de cada usuario, incluyendo roles, credenciales y estado de bloqueo. Es un componente esencial en la gestión de autenticación, autorización y administración de usuarios.

📚 Cuerpo técnico
🔧 Estructura y definición del modelo
El modelo User se define mediante sequelize.define(...), estableciendo la estructura de la tabla que será creada o sincronizada en la base de datos PostgreSQL. Se utilizan los tipos de datos provistos por Sequelize (DataTypes) y configuraciones explícitas para asegurar validaciones y restricciones.

js
Copy
Edit
sequelize.define('User', { ... }, {
  timestamps: false,
  freezeTableName: true,
});
📐 Atributos del modelo
Campo	Tipo	Restricciones	Descripción
user_id	INTEGER	primaryKey, autoIncrement, not null	Identificador único del usuario
name	STRING	not null	Nombre del usuario
email	STRING	not null, unique	Correo electrónico único del usuario
password	STRING	not null	Contraseña del usuario (generalmente encriptada)
role	ENUM	'user', 'editor', 'admin'
default: user	Rol asignado que determina el nivel de acceso
block	BOOLEAN	default: false, not null	Estado de bloqueo del usuario

🛠 Opciones de configuración
timestamps: false: No se incluyen los campos createdAt y updatedAt.

freezeTableName: true: El nombre del modelo no será pluralizado automáticamente por Sequelize, la tabla se llamará exactamente User.

🧪 Muestras
A continuación, se presentan algunos objetos de ejemplo que pueden utilizarse para crear o actualizar registros mediante este modelo:

✅ Crear un usuario básico
json
Copy
Edit
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "miClaveSegura123"
}
✅ Crear un usuario con rol específico
json
Copy
Edit
{
  "name": "María Editora",
  "email": "maria@example.com",
  "password": "claveEditor456",
  "role": "editor"
}
✅ Bloquear un usuario
json
Copy
Edit
{
  "block": true
}
⛔ Errores esperables
Código	Desencadenante	Descripción técnica
400	Falta de campo obligatorio (name, email, password)	Sequelize lanzará error de validación
409	Duplicación del campo email	Sequelize impedirá la inserción por restricción unique
422	Valor no permitido en role	Valor fuera del ENUM 'user', 'editor', 'admin'

Estos errores deben ser capturados y gestionados desde controladores o middleware de validación para ofrecer respuestas claras al cliente.

🔗 Dependencias
Este archivo depende directamente de:

Sequelize y DataTypes: provistos por el ORM Sequelize.

✅ Este modelo es instanciado y registrado en:

📁 src/db.js: donde se importan todos los modelos dinámicamente.

🧩 Relaciones definidas en db.js:

User tiene una relación hasMany con Post y Rating.

Rating tiene una relación belongsTo con User.

🗂️ Diagrama de relaciones (resumen)
plaintext
Copy
Edit
User
 ├── hasMany → Post (por authorId)
 └── hasMany → Rating (por userId)

Rating
 └── belongsTo → User

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/models/Post.js
📌 Resumen
Modelo Sequelize que define la estructura de los registros de publicaciones (Post) en la base de datos. Su función principal es mapear artículos o entradas con encabezado, contenido y metadatos como vistas y timestamps.

🧠 Cuerpo Técnico
Este archivo define el modelo Post utilizando Sequelize ORM. El modelo está preparado para representar entradas editoriales, artículos, blogs u otros tipos de publicaciones escritas, permitiendo persistencia en una base de datos SQL relacional.

🧩 Estructura del Modelo
El modelo se declara mediante sequelize.define, y contiene los siguientes campos:

Campo	Tipo	Requerido	Descripción
post_id	INTEGER	✅ Sí	Clave primaria autoincremental del post.
headline	STRING	✅ Sí	Título principal del artículo.
lead	TEXT	✅ Sí	Introducción o resumen que aparece antes del cuerpo principal.
body	TEXT	✅ Sí	Cuerpo completo del artículo.
conclusion	TEXT	❌ No	Conclusión o cierre opcional del artículo.
views	INTEGER	✅ Sí	Contador de visualizaciones. Valor por defecto: 0.

Además, el modelo tiene las siguientes configuraciones:

js
Copy
Edit
{
  timestamps: true,           // Agrega automáticamente las columnas createdAt y updatedAt
  freezeTableName: true       // Impide la pluralización automática del nombre del modelo
}
Esto implica que Sequelize generará una tabla Post (no Posts) con las columnas adicionales createdAt y updatedAt, útiles para el seguimiento temporal de cada publicación.

🔁 Flujo General
mermaid
Copy
Edit
graph TD
  A[API Request: Crear Post] --> B[Controlador procesa datos]
  B --> C[Llama al modelo Post]
  C --> D[Se ejecuta Post.create()]
  D --> E[Persistencia en Base de Datos]
  E --> F[Respuesta al cliente]
🧪 Muestras
Crear una publicación
json
Copy
Edit
{
  "headline": "Título de ejemplo",
  "lead": "Este es el párrafo introductorio de la publicación.",
  "body": "Este es el cuerpo principal del contenido. Puede contener mucho texto.",
  "conclusion": "Gracias por leer hasta el final."
}
Incrementar vistas manualmente
js
Copy
Edit
await Post.increment('views', { where: { post_id: 1 } });
⛔ Errores Posibles
Código	Mensaje Esperado	Causa
400	"headline" no puede ser nulo	Campo obligatorio no enviado o inválido
400	"lead" no puede ser nulo	Campo obligatorio omitido
400	"body" no puede ser nulo	Campo obligatorio omitido
500	Error de conexión con la DB	Fallo al conectarse o persistir en la BD

⚠️ Los errores mencionados se deben manejar adecuadamente desde los controladores.

🔗 Dependencias
📁 /src/models/index.js: Punto de entrada donde se importa y sincroniza el modelo Post junto a los demás modelos Sequelize.

📁 Controladores: Los controladores relacionados pueden ser createPost.js, getPostById.js, updatePost.js, etc.

📁 Base de datos: Requiere una instancia Sequelize previamente configurada (conexión y autenticación).

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/models/Media.js
📌 Resumen
Modelo Sequelize que define la entidad Media, utilizada para almacenar recursos multimedia (imágenes o videos) asociados a una publicación, producto u otro contenido. Este modelo permite gestionar tanto el tipo como la URL y el orden de aparición del recurso en una colección.

🧠 Cuerpo Técnico
El archivo Media.js define un modelo de datos Sequelize llamado Media. Este modelo está optimizado para representar archivos multimedia en sistemas que requieran una estructura ordenada de medios visuales o audiovisuales, como galerías, presentaciones de productos o publicaciones con contenido enriquecido.

🧩 Estructura del Modelo
js
Copy
Edit
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
Desglose de campos
Campo	Tipo de dato	Requerido	Descripción
media_id	INTEGER	✅ Sí	Clave primaria autoincremental del recurso.
type	ENUM('image', 'video')	✅ Sí	Indica si el medio es una imagen o un video.
url	STRING	✅ Sí	Ruta o dirección del archivo multimedia (puede ser local o externa).
position	INTEGER	✅ Sí	Orden del recurso dentro de una colección o galería.

Opciones del modelo
timestamps: false: No se agregan campos automáticos createdAt ni updatedAt.

freezeTableName: true: El nombre de la tabla en la base de datos será Media (sin pluralización automática).

🔁 Flujo típico de uso
mermaid
Copy
Edit
sequenceDiagram
  participant Frontend
  participant API
  participant DB

  Frontend->>API: POST /media (con body)
  API->>DB: Media.create({ ... })
  DB-->>API: Objeto Media creado
  API-->>Frontend: 201 Created + objeto
Este modelo suele utilizarse junto con un identificador externo (por ejemplo, post_id, product_id, etc.), el cual se agrega mediante asociaciones (hasMany, belongsTo) en otros modelos. El modelo Media es neutro respecto a la entidad que consume los recursos.

🧪 Muestras
Crear un recurso de tipo imagen
json
Copy
Edit
{
  "type": "image",
  "url": "https://cdn.example.com/uploads/imagen1.jpg",
  "position": 1
}
Crear un recurso de tipo video
json
Copy
Edit
{
  "type": "video",
  "url": "https://cdn.example.com/videos/trailer.mp4",
  "position": 2
}
⛔ Errores
Código	Mensaje Esperado	Causa
400	"type" debe ser 'image' o 'video'	Valor fuera del ENUM definido en type.
400	"url" no puede ser nulo	Campo obligatorio omitido.
400	"position" debe ser un número entero	Campo mal tipeado o faltante.
500	Error de persistencia en Media.create()	Error interno en la conexión o validación Sequelize.

⚠️ Los errores pueden variar según el controlador o middleware donde se utilice este modelo.

🔗 Dependencias
📁 /src/models/index.js: Punto de carga donde el modelo Media debe ser importado y registrado.

📁 Controladores relacionados:

createMedia.js

getMediaById.js

deleteMedia.js

updateMedia.js

📁 Asociaciones (opcional según proyecto):

Post.hasMany(Media)

Media.belongsTo(Post)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/models/Rating.js
📌 Resumen
Modelo Sequelize Rating — Define la estructura y comportamiento de la tabla Rating en la base de datos, destinada a representar la valoración (positiva o negativa) de entidades relacionadas, como publicaciones o comentarios. Este modelo admite votos binarios (valueUp y valueDown) y puede asociarse a otros modelos mediante relaciones foráneas.

🧩 Cuerpo técnico
📐 Estructura del modelo
El archivo Rating.js define un modelo Sequelize para gestionar valoraciones de tipo binario (upvote/downvote). La definición utiliza sequelize.define para registrar el modelo en la instancia activa de Sequelize y establecer sus propiedades, tipos de datos y opciones de configuración.

📄 Campos definidos:
Campo	Tipo	Requerido	Valor por defecto	Descripción
rating_id	INTEGER (PK, AI)	✅	—	Identificador único de la valoración.
valueUp	BOOLEAN	❌	false	Indica si es una valoración positiva.
valueDown	BOOLEAN	❌	false	Indica si es una valoración negativa.

⚙️ Opciones del modelo:
js
Copy
Edit
{
  timestamps: false,         // No se registran campos createdAt / updatedAt
  freezeTableName: true      // El nombre de la tabla no será pluralizado automáticamente
}
🔄 Flujo de uso
Este modelo está diseñado para integrarse con relaciones externas, por ejemplo:

Un Post puede tener múltiples Ratings.

Un User puede emitir Ratings.

Usualmente, los controladores o rutas consumirán este modelo para:

Crear nuevas valoraciones (Rating.create()).

Consultar votos emitidos por un usuario.

Contabilizar valoraciones para un recurso.

🧪 Muestras de uso
✅ Crear una valoración positiva
js
Copy
Edit
await Rating.create({
  valueUp: true,
  valueDown: false
});
✅ Crear una valoración negativa
js
Copy
Edit
await Rating.create({
  valueUp: false,
  valueDown: true
});
⚠️ Aunque técnicamente es posible que ambos valores sean false o true, el controlador debería implementar lógica para permitir solo una opción activa por vez. Es decir, un solo voto por rating.

⛔ Errores esperables
Este modelo no define validaciones personalizadas ni errores de Sequelize específicos, pero se deben manejar los siguientes escenarios desde los controladores o rutas asociadas:

Código	Descripción
400	Valor duplicado o estructura inválida (valueUp y valueDown ambos en true o ambos en false sin control externo).
500	Error interno de Sequelize por conexión o fallo al guardar.

🔗 Dependencias
Archivos relacionados:
📦 sequelize — ORM utilizado para definir el modelo.

📁 src/db.js — Donde se importa y sincroniza el modelo con la base de datos.

📁 Posibles relaciones (no incluidas en este archivo, pero previstas para la arquitectura):

User.js

Post.js o cualquier otro modelo al que se aplique una valoración.

🧭 Consideraciones futuras
Es recomendable agregar una validación a nivel de controlador que impida valores ambiguos (valueUp === valueDown).

Puede mejorarse mediante un único campo value del tipo ENUM('up', 'down') o incluso INTEGER (+1/-1), para simplificar lógica.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/models/Tag.js
📌 Resumen
Modelo Sequelize Tag — Define la tabla Tag en la base de datos, utilizada para representar etiquetas (o categorías) únicas que pueden asociarse a otras entidades del sistema, como publicaciones, productos o usuarios. Permite la gestión controlada de etiquetas mediante restricciones de unicidad y obligatoriedad.

🧩 Cuerpo técnico
📐 Estructura del modelo
Este archivo define un modelo de Sequelize llamado Tag. Su función es representar una etiqueta textual que puede ser usada para clasificar o agrupar otras entidades dentro del sistema.

js
Copy
Edit
sequelize.define('Tag', { ... }, { ... });
🧱 Campos definidos:
Campo	Tipo	Requerido	Restricciones	Descripción
tag_id	INTEGER (PK, AI)	✅	Primaria, autoincremental	Identificador único de la etiqueta.
name	STRING	✅	allowNull: false, unique: true	Nombre de la etiqueta. Debe ser único y no nulo.

⚙️ Opciones del modelo:
js
Copy
Edit
{
  timestamps: false,         // Desactiva campos createdAt / updatedAt
  freezeTableName: true      // Usa el nombre "Tag" como está, sin pluralización
}
Esto permite un control preciso sobre el nombre de la tabla en la base de datos (Tag) y evita la generación automática de campos de auditoría innecesarios para este modelo simple.

🔄 Flujo de uso común
El modelo Tag se utiliza principalmente para:

Registrar nuevas etiquetas (evitando duplicados).

Consultar etiquetas disponibles.

Asociar etiquetas a otras entidades mediante relaciones belongsToMany.

💡 Casos de uso típicos:
Crear etiquetas únicas desde el panel administrativo.

Listar todas las etiquetas disponibles para filtrado.

Asociar múltiples etiquetas a un Post, Product, etc., mediante una tabla intermedia (PostTag, ProductTag, etc.).

🧪 Muestras de uso
✅ Crear una nueva etiqueta
js
Copy
Edit
await Tag.create({
  name: "javascript"
});
✅ Buscar todas las etiquetas
js
Copy
Edit
const tags = await Tag.findAll();
⛔ Errores esperables
Aunque el modelo no incluye validaciones personalizadas, Sequelize puede generar errores si se violan restricciones:

Código	Desencadenante	Descripción
400	name no enviado o null	El campo name es obligatorio (allowNull: false).
400	name duplicado	El campo name debe ser único (unique: true).
500	Error de conexión / Sequelize	Fallo interno al ejecutar la operación sobre la base de datos.

Estos errores deben ser capturados en el controlador correspondiente y devueltos al cliente con mensajes claros.

🔗 Dependencias
Archivos relacionados:
📦 sequelize — ORM utilizado para definir y sincronizar el modelo.

📁 src/db.js — Archivo de inicialización de Sequelize donde se importa y registra el modelo.

📁 Relaciones posibles:

Post.js o Product.js — Asociaciones many-to-many mediante tablas intermedias.

Controladores y rutas para gestionar CRUD de etiquetas (no definidos en este archivo).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/index.js
📌 Resumen
Router raíz del servidor Express — Este archivo centraliza y organiza el enrutamiento de todas las funcionalidades principales del backend, agrupando los routers específicos por dominio: usuarios, publicaciones, valoraciones, etiquetas y autenticación. Además, implementa un middleware global de logging útil para depuración en desarrollo.

🧩 Cuerpo técnico
🧱 Estructura general del archivo
js
Copy
Edit
const { Router } = require('express');
const router = Router();
Se importa y crea una instancia del enrutador principal de Express. Luego, se importan y montan los subrouters para cada dominio funcional del sistema:

js
Copy
Edit
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const ratingRouter = require('./rating.routes');
const tagRouter = require('./tag.routes');
const authRouter = require('./auth.routes');
🔁 Middleware global
Antes de conectar las rutas, se define un middleware que registra en consola cada solicitud entrante, mostrando su ruta. Esta funcionalidad es útil para trazabilidad y debugging, especialmente en entornos de desarrollo:

js
Copy
Edit
router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});
Este middleware no altera el flujo de peticiones y puede expandirse fácilmente para incluir más datos como método HTTP, IP del cliente, tiempo de respuesta, etc.

🗺️ Rutas montadas
Ruta base	Subrouter	Funcionalidad gestionada
/users	user.routes.js	Registro, actualización y obtención de usuarios
/posts	post.routes.js	Creación, lectura y edición de publicaciones
/ratings	rating.routes.js	Valoraciones de publicaciones o contenidos
/tags	tag.routes.js	Gestión de etiquetas asociadas
/auth	auth.routes.js	Autenticación: login, registro, validación

Cada una de estas rutas delega la lógica específica en sus respectivos módulos, promoviendo separación de responsabilidades y mantenibilidad.

📦 Flujo de petición
plaintext
Copy
Edit
Cliente → [Middleware de log] → [Ruta /x] → [Router específico] → [Controladores asociados]
Este archivo actúa como un router de alto nivel, facilitando la escalabilidad del backend mediante una arquitectura modular y desacoplada.

🧪 Muestras de uso
Como este archivo no define rutas directas ni controladores propios, no se requieren muestras de entrada/salida en esta sección. Las muestras se encuentran en los respectivos archivos de rutas (user.routes.js, post.routes.js, etc.).

⛔ Errores
Este archivo no define manejo de errores propio, pero podrían considerarse los siguientes puntos:

Escenario	Descripción
Ruta no encontrada	Si no existe un router.use('*', handler404) posterior, la ruta quedará sin respuesta explícita.
Fallos en routers montados	Errores derivados de subrouters deben ser tratados dentro de ellos o propagados al middleware de error general.

⚠️ Se recomienda agregar un middleware de error global y una ruta catch-all (404) en el punto de montaje del servidor principal (app.js o server.js).

🔗 Dependencias
📁 Archivos relacionados
Archivo	Rol
./user.routes.js	Enrutador de usuarios
./post.routes.js	Enrutador de publicaciones
./rating.routes.js	Enrutador de valoraciones
./tag.routes.js	Enrutador de etiquetas
./auth.routes.js	Enrutador de autenticación
app.js o server.js	Punto de entrada donde se importa este router

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/user.routes.js
📌 Resumen
Archivo de configuración de rutas para el recurso User dentro de la API. Este módulo expone los endpoints principales para operaciones CRUD y de bloqueo lógico de usuarios. Se apoya en controladores especializados (handlers) para cada tipo de operación.
Su propósito es vincular rutas específicas HTTP con las funciones de manejo adecuadas para facilitar la administración de usuarios desde el cliente o herramientas de pruebas como Postman o Insomnia.

🧩 Cuerpo
🔧 Estructura del Código
js
Copy
Edit
const { Router } = require('express');
const handlerGetAllUsers = require('../handlers/user/handlerGetAllUsers');
const handlerCreateUser = require('../handlers/user/handlerCreateUser');
const handlerUpdateUser = require('../handlers/user/handlerUpdateUser');
const handlerBlockUser = require('../handlers/user/handlerBlockUser');
const handlerDeleteUser = require('../handlers/user/handlerDeleteUser');

const userRouter = Router();

userRouter.get('/', handlerGetAllUsers);
userRouter.post('/', handlerCreateUser);
userRouter.put('/:id', handlerUpdateUser);
userRouter.delete('/block/:id', handlerBlockUser);
userRouter.delete('/:id', handlerDeleteUser);

module.exports = userRouter;
📘 Explicación Técnica
Este archivo define el módulo de enrutamiento para la entidad User, el cual se integra posteriormente en src/routes/index.js. Las rutas implementadas permiten:

Método	Ruta	Descripción
GET	/users/	Recupera todos los usuarios registrados
POST	/users/	Crea un nuevo usuario con la información del body
PUT	/users/:id	Actualiza un usuario existente según su ID
DELETE	/users/block/:id	Realiza un bloqueo lógico del usuario (soft delete)
DELETE	/users/:id	Elimina de forma permanente al usuario según su ID

🔄 Flujo del Código
Se importa Router desde Express para crear un enrutador modular.

Se importan los handlers correspondientes que contienen la lógica principal de cada operación.

Se define el objeto userRouter y se le asignan rutas específicas mediante los métodos HTTP.

Finalmente, se exporta userRouter para su uso en el enrutador general del proyecto.

🧪 Muestras
🎯 Crear Usuario
json
Copy
Edit
POST /users/
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "isAdmin": false
}
🛠️ Actualizar Usuario
json
Copy
Edit
PUT /users/5
Content-Type: application/json

{
  "name": "Juan P. Actualizado",
  "email": "juanperez@example.com"
}
🔒 Bloquear Usuario
bash
Copy
Edit
DELETE /users/block/5
❌ Eliminar Usuario
bash
Copy
Edit
DELETE /users/5
⛔ Errores
⚠️ A continuación se detallan los posibles errores que pueden emerger desde los handlers conectados a estas rutas. La lista puede variar según la implementación de cada handler:

Código HTTP	Mensaje	Causa
400	Faltan campos obligatorios	El cuerpo de la petición no contiene datos requeridos
404	Usuario no encontrado	El ID no corresponde a ningún usuario registrado
409	Email ya registrado	El email ya existe en la base de datos
500	Error del servidor	Fallo interno no controlado

🧷 Dependencias
Tipo	Archivo	Descripción
📦 Handler	../handlers/user/handlerGetAllUsers.js	Obtención masiva de usuarios
📦 Handler	../handlers/user/handlerCreateUser.js	Creación de un nuevo usuario
📦 Handler	../handlers/user/handlerUpdateUser.js	Edición de usuario por ID
📦 Handler	../handlers/user/handlerBlockUser.js	Bloqueo lógico de usuario
📦 Handler	../handlers/user/handlerDeleteUser.js	Eliminación física del usuario

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/auth.routes.js
📌 Resumen
Este archivo define las rutas relacionadas con autenticación de usuarios dentro de la API. Utiliza el módulo Router de Express para establecer puntos de entrada HTTP para el registro (register) y acceso (login) de usuarios.
Cada ruta delega la lógica principal a su correspondiente handler, permitiendo una separación clara entre el enrutamiento y la lógica de negocio.

🧩 Cuerpo
🔧 Estructura del Código
js
Copy
Edit
const { Router } = require('express');
const handlerRegister = require('../handlers/auth/handlerRegister');
const handlerLogin = require('../handlers/auth/handlerLogin');

const router = Router();

router.post('/register', handlerRegister);
router.post('/login', handlerLogin);

module.exports = router;
📘 Explicación Técnica
Este archivo se encarga de exponer las rutas públicas de autenticación del sistema. Utiliza el sistema de modularización de Express para crear un router local específico del dominio auth.

Las rutas definidas son:

Método	Ruta	Descripción
POST	/auth/register	Registra un nuevo usuario
POST	/auth/login	Valida credenciales y genera sesión

Cada una de estas rutas está asociada a una función manejadora (handler) ubicada en la carpeta handlers/auth/.

📂 Flujo General
Se importa Router desde express.

Se importan los handlers para las operaciones de autenticación.

Se define un nuevo router local (router).

Se agregan las rutas para POST /register y POST /login.

Finalmente, se exporta este router para ser integrado en src/routes/index.js.

🧪 Muestras
📝 Registro de Usuario
http
Copy
Edit
POST /auth/register
Content-Type: application/json

{
  "name": "Ana López",
  "email": "ana@example.com",
  "password": "password123"
}
📥 Respuesta esperada (201 Created)
json
Copy
Edit
{
  "message": "Usuario registrado exitosamente.",
  "user": {
    "id": 12,
    "name": "Ana López",
    "email": "ana@example.com"
  },
  "token": "JWT_GENERADO"
}
🔐 Inicio de Sesión
http
Copy
Edit
POST /auth/login
Content-Type: application/json

{
  "email": "ana@example.com",
  "password": "password123"
}
📥 Respuesta esperada (200 OK)
json
Copy
Edit
{
  "message": "Inicio de sesión exitoso.",
  "user": {
    "id": 12,
    "name": "Ana López",
    "email": "ana@example.com"
  },
  "token": "JWT_GENERADO"
}
⛔ Errores
Código HTTP	Mensaje	Causa Potencial
400	Faltan datos obligatorios	El body no contiene nombre, email o password
401	Credenciales incorrectas	El email no existe o la contraseña es incorrecta
409	Usuario ya registrado	El email ya está registrado en la base de datos
500	Error interno del servidor	Error inesperado en la lógica del handler

🧷 Dependencias
Tipo	Archivo	Descripción
📦 Handler	../handlers/auth/handlerRegister.js	Lógica del registro de usuario
📦 Handler	../handlers/auth/handlerLogin.js	Validación de credenciales y generación de token
📁 Modelo	src/models/User.js (probable)	Modelo Sequelize del usuario
🔐 Utilidad	utils/generateToken.js (si aplica)	Generación de JWT para sesión

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/post.routes.js
📌 Resumen
Este archivo define el conjunto de rutas HTTP para operar con publicaciones (posts) dentro de la API. Utiliza el enrutador de Express para gestionar funcionalidades CRUD, votaciones y filtrado por popularidad. Cada ruta delega su lógica en un handler especializado, siguiendo el principio de separación de responsabilidades.

Estas rutas permiten:

Listar publicaciones.

Crear, actualizar y eliminar publicaciones.

Votar publicaciones.

Obtener publicaciones populares.

🧩 Cuerpo
🔧 Estructura del Código
js
Copy
Edit
const { Router } = require('express');
const postRouter = Router();

const getAllPosts = require('../handlers/post/handlerGetAllPost');
const createPost = require('../handlers/post/handlerCreatePost');
const updatePost = require('../handlers/post/handlerUpdatePost');
const deletePost = require('../handlers/post/handlerDeletePost');
const votePost = require('../handlers/post/handlerVotePost');
const handlerGetPopularPosts = require('../handlers/post/handlerGetPopularPosts');

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/rating', votePost);
postRouter.get('/popular', handlerGetPopularPosts);

module.exports = postRouter;
📘 Explicación Técnica
Este módulo define un router local (postRouter) para agrupar todas las rutas relativas a publicaciones. Cada ruta responde a una acción HTTP específica y está asociada a un handler que implementa la lógica correspondiente.

📌 Rutas y Funcionalidades
Método	Ruta	Descripción
GET	/posts/	Obtiene todas las publicaciones.
POST	/posts/	Crea una nueva publicación.
PUT	/posts/:id	Actualiza una publicación existente (por ID).
DELETE	/posts/:id	Elimina una publicación por ID.
POST	/posts/:id/rating	Permite votar una publicación (positivo o negativo).
GET	/posts/popular	Devuelve publicaciones ordenadas por popularidad o votos.

📂 Flujo Interno
Se importa el Router desde express y se instancia postRouter.

Se importan todos los handlers que contienen la lógica para cada acción.

Se definen las rutas con sus métodos HTTP.

Finalmente, el router se exporta para ser usado en routes/index.js.

🧪 Muestras
📥 Crear una publicación
http
Copy
Edit
POST /posts
Content-Type: application/json

{
  "title": "¿Qué opinan del nuevo framework?",
  "content": "Me gustaría saber qué piensan sobre el rendimiento de XJS."
}
📤 Votar una publicación
http
Copy
Edit
POST /posts/7/rating
Content-Type: application/json

{
  "vote": 1
}
Nota: El valor de vote puede ser 1 (positivo) o -1 (negativo).

🛠️ Actualizar título de una publicación
http
Copy
Edit
PUT /posts/7
Content-Type: application/json

{
  "title": "Actualización: Framework XJS"
}
⛔ Errores
Código HTTP	Mensaje o Causa	Handler
400	Datos faltantes o inválidos	createPost, updatePost, votePost
404	Publicación no encontrada	updatePost, deletePost, votePost
500	Error interno del servidor	Cualquiera

🧷 Dependencias
Tipo	Archivo	Descripción
🧩 Handler	handlerGetAllPost.js	Recupera todas las publicaciones
🧩 Handler	handlerCreatePost.js	Crea una nueva publicación
🧩 Handler	handlerUpdatePost.js	Modifica una publicación existente
🧩 Handler	handlerDeletePost.js	Elimina una publicación
🧩 Handler	handlerVotePost.js	Gestiona votos positivos/negativos
🧩 Handler	handlerGetPopularPosts.js	Recupera publicaciones ordenadas por popularidad
📁 Modelo	src/models/Post.js (posible)	Define el modelo de datos de publicaciones
📁 Modelo	src/models/User.js (si se vincula el autor)	Puede ser utilizado para asociar publicaciones a usuarios
📁 Utils	utils/calculateRating.js (opcional)	Algoritmo de puntuación o clasificación (si existe)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/rating.routes.js
📌 Resumen técnico
Este archivo define la ruta principal para el sistema de calificación de publicaciones (ratings) en la API. Utiliza el método HTTP POST para permitir a los usuarios registrar una calificación sobre una publicación específica mediante su postId. Su uso está orientado a funcionalidades de tipo "votación" o "rating" de contenido dentro de la plataforma.

🧩 Cuerpo técnico explicativo
🔧 Estructura del archivo
js
Copy
Edit
const { Router } = require('express');
const handlerVotePost = require('../handlers/rating/handlerVotePost');

const ratingRouter = Router();

ratingRouter.post('/:postId', handlerVotePost);

module.exports = ratingRouter;
🔍 Desglose técnico
Elemento	Descripción técnica
Router()	Método de express que permite encapsular rutas en un módulo reutilizable.
handlerVotePost	Handler que gestiona la lógica de registrar una calificación en una publicación.
ratingRouter.post('/:postId')	Define una ruta POST con parámetro dinámico postId. Esta ruta recibe el voto y lo procesa.
module.exports = ratingRouter	Exporta el router para ser utilizado en la carga principal de rutas del servidor.

📡 Flujo de ejecución
Cliente realiza un POST a /rating/:postId con los datos del voto (ej. usuario, puntaje, etc.).

El servidor enruta la petición hacia handlerVotePost, ubicado en ../handlers/rating/handlerVotePost.js.

Dentro del handler, se:

Extrae el postId desde req.params.

Valida los datos del voto desde req.body.

Registra el voto en la base de datos (modelo Rating o similar).

Calcula o actualiza la media de votos del post (si aplica).

Devuelve una respuesta con estado de éxito o error.

Esta ruta es especialmente útil en sistemas donde se desea implementar una lógica de reputación, ranking o feedback basado en la interacción del usuario con el contenido.

🧪 Muestras de peticiones
🟨 Crear un voto para una publicación
Endpoint

bash
Copy
Edit
POST /rating/54321
Body

json
Copy
Edit
{
  "userId": "12345",
  "rating": 4
}
Respuesta exitosa

json
Copy
Edit
{
  "message": "Voto registrado correctamente.",
  "data": {
    "postId": "54321",
    "userId": "12345",
    "rating": 4
  }
}
⛔ Manejo de errores
Código HTTP	Descripción del error	Causa posible
400	"Faltan datos para registrar el voto"	req.body incompleto o inválido
404	"Publicación no encontrada"	El postId no coincide con ningún registro
409	"El usuario ya votó esta publicación"	Se intenta registrar un voto duplicado
500	"Error interno del servidor"	Error no manejado dentro del handler o DB

Estos errores deben ser capturados en el front-end para dar feedback adecuado al usuario.

🧷 Dependencias
📁 ../handlers/rating/handlerVotePost.js
👉 Contiene la lógica del controlador que gestiona el flujo de votación y conexión con la base de datos.

📁 Posible conexión indirecta con modelos como:

Post (para asociar el voto al post)

User (para validar al votante)

Rating o tabla intermedia si se usa una relación N:N para votos

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/routes/tag.routes.js
📌 Resumen técnico
Este archivo define el router correspondiente a las operaciones CRUD básicas del recurso Tag en el sistema. Implementa dos rutas:

GET /tags: para obtener todas las etiquetas registradas.

POST /tags: para crear una nueva etiqueta.

Este router actúa como punto de entrada para el manejo de taxonomías, categorías o palabras clave asociadas a otras entidades del sistema (ej. publicaciones, productos, entradas, etc.).

🧩 Cuerpo técnico explicativo
📂 Estructura del archivo
js
Copy
Edit
const { Router } = require('express');
const handlerGetAllTags = require('../handlers/tag/handlerGetAllTags');
const handlerCreateTag = require('../handlers/tag/handlerCreateTag');

const tagRouter = Router();

tagRouter.get('/', handlerGetAllTags);
tagRouter.post('/', handlerCreateTag);

module.exports = tagRouter;
🧪 Desglose técnico por sección
Componente	Descripción
Router()	Función de Express para definir un módulo de rutas.
handlerGetAllTags	Handler encargado de recuperar todas las etiquetas almacenadas.
handlerCreateTag	Handler responsable de validar y persistir una nueva etiqueta en base de datos.
tagRouter.get('/', handlerGetAllTags)	Ruta GET que invoca el handler para obtener todas las etiquetas.
tagRouter.post('/', handlerCreateTag)	Ruta POST que permite registrar una nueva etiqueta.
module.exports = tagRouter	Exporta el router para ser integrado al enrutador principal del servidor.

📡 Flujo de ejecución
🔷 GET /tags
El cliente realiza una petición GET a /tags.

El router invoca handlerGetAllTags.

El handler:

Realiza la consulta en la base de datos (probablemente en un modelo Tag).

Devuelve el listado completo de etiquetas en formato JSON.

🔶 POST /tags
El cliente realiza una petición POST a /tags con un objeto tag.

El router enruta la solicitud a handlerCreateTag.

El handler:

Valida que los campos requeridos estén presentes (ej. name).

Verifica si ya existe una etiqueta con el mismo nombre (si aplica).

Crea y persiste la nueva etiqueta en la base de datos.

Devuelve el objeto creado o un mensaje de error.

🧪 Muestras
🟦 Crear una etiqueta
Endpoint

bash
Copy
Edit
POST /tags
Body

json
Copy
Edit
{
  "name": "javascript"
}
Respuesta esperada

json
Copy
Edit
{
  "message": "Etiqueta creada correctamente.",
  "data": {
    "id": 7,
    "name": "javascript"
  }
}
🟩 Obtener todas las etiquetas
Endpoint

bash
Copy
Edit
GET /tags
Respuesta esperada

json
Copy
Edit
[
  { "id": 1, "name": "backend" },
  { "id": 2, "name": "frontend" },
  { "id": 3, "name": "devops" },
  ...
]
⛔ Manejo de errores
Código HTTP	Descripción del error	Causa posible
400	"Faltan campos requeridos"	El cuerpo del POST no incluye name.
409	"Ya existe una etiqueta con ese nombre"	El nombre enviado ya fue registrado previamente.
500	"Error interno del servidor"	Fallo en la base de datos o error inesperado.

⚠️ Estos errores deben ser gestionados en el cliente para mostrar alertas adecuadas al usuario.

🧷 Dependencias
📁 ../handlers/tag/handlerGetAllTags.js
👉 Lógica para consultar todas las etiquetas desde la base de datos.

📁 ../handlers/tag/handlerCreateTag.js
👉 Lógica para validar y registrar una nueva etiqueta.

📁 Posible relación con el modelo: Tag.js
📌 Modelo ORM (Sequelize, Mongoose, etc.) que define la entidad Tag.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/controllers/createUser.js & src/handlers/handlerCreateUser.js
📌 Resumen técnico
Este conjunto de archivos implementa la creación de nuevos usuarios en el sistema. El controller createUser gestiona la lógica de negocio y validación, mientras que el handler handlerCreateUser responde a la petición HTTP, integrando el flujo dentro de la arquitectura Express.

🧩 Cuerpo técnico explicativo
🔹 Estructura general
text
Copy
Edit
📁 src
 └── controllers
     └── user
         └── createUser.js
 └── handlers
     └── user
         └── handlerCreateUser.js
🧠 Función principal: createUser(name, email, password, role)
Este módulo exporta una función async que recibe las siguientes propiedades como parámetros:

name (string) → obligatorio.

email (string) → obligatorio.

password (string) → obligatorio.

role (string) → opcional (por defecto: "user").

Objetivo: crear un nuevo registro en la base de datos utilizando el modelo User.

🔍 Flujo de ejecución
Validación inicial:

Si falta alguno de los campos obligatorios (name, email, password), se lanza un error.

js
Copy
Edit
if (!name || !email || !password) throw new Error('Faltan datos obligatorios');
Verificación de duplicados:

Se consulta la base de datos buscando un usuario existente con el mismo email.

js
Copy
Edit
const existing = await User.findOne({ where: { email } });
if (existing) throw new Error('Ya existe un usuario con ese correo');
Creación del usuario:

Si las validaciones anteriores pasan, se genera un nuevo usuario con los valores dados.

El campo role es opcional y por defecto se asigna 'user'.

El campo blocked se asigna como false por defecto.

js
Copy
Edit
const newUser = await User.create({ ... });
🔐 Nota importante: la contraseña se almacena directamente. Se sugiere implementar una capa de encriptación antes de guardar (por ejemplo, usando bcryptjs o argon2).

Retorno:

El controller retorna el objeto newUser generado.

🔹 handlerCreateUser
Ubicación: src/handlers/user/handlerCreateUser.js

Encargado de:

Extraer los datos del cuerpo de la petición HTTP (req.body).

Llamar a createUser con los parámetros extraídos.

Enviar una respuesta HTTP adecuada según éxito o error.

js
Copy
Edit
res.status(201).json(user); // creación exitosa
res.status(400).json({ error: err.message }); // error manejado
🧪 Muestras
▶️ Crear usuario
Método: POST
Ruta (ejemplo de integración): /api/user/register
Body JSON:

json
Copy
Edit
{
  "name": "Ana Gómez",
  "email": "ana@example.com",
  "password": "1234Secure!",
  "role": "admin"
}
Respuesta esperada (201):

json
Copy
Edit
{
  "id": 1,
  "name": "Ana Gómez",
  "email": "ana@example.com",
  "password": "1234Secure!", // En entorno real debe estar hasheada
  "role": "admin",
  "blocked": false,
  "updatedAt": "2025-07-27T18:25:43.511Z",
  "createdAt": "2025-07-27T18:25:43.511Z"
}
⛔ Errores
Código	Mensaje	Causa
400	Faltan datos obligatorios	No se enviaron name, email o password.
400	Ya existe un usuario con ese correo	El email ya está registrado en la base de datos.

❗ Los errores se devuelven en el formato:
{ "error": "mensaje" }

🧩 Dependencias
📦 Modelo: User (src/db/index.js)

📄 Controller: src/controllers/user/createUser.js

📄 Handler: src/handlers/user/handlerCreateUser.js

🌐 Framework: Express

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/controllers/getAllUsers.js
📁 src/handlers/handlerGetAllUsers.js
📌 Resumen técnico
Estos archivos implementan la lógica de recuperación de todos los usuarios registrados en la base de datos. El controlador (getAllUsers.js) ejecuta una consulta a la base de datos para traer los registros excluyendo el campo sensible password, mientras que el handler (handlerGetAllUsers.js) expone esta funcionalidad como un endpoint GET para ser consumido desde el frontend u otros servicios.

🧩 Cuerpo técnico detallado
🔹 src/controllers/getAllUsers.js
Este módulo define una función asíncrona que consulta todos los usuarios registrados en la tabla User del ORM Sequelize.

js
Copy
Edit
const { User } = require('../../db');

module.exports = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] } // ocultar password
  });

  return users;
};
Detalles técnicos:

Se importa el modelo User desde la instancia de Sequelize configurada en ../../db.

Se ejecuta una llamada a findAll() para traer todos los usuarios.

El atributo password se excluye explícitamente del resultado utilizando attributes: { exclude: [...] }, por seguridad.

La función retorna el array de usuarios.

🔹 src/handlers/handlerGetAllUsers.js
Este handler expone la lógica del controlador anterior como una ruta HTTP, lista para ser utilizada desde un cliente externo.

js
Copy
Edit
const getAllUsers = require('../../controllers/user/getAllUsers');

module.exports = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
Detalles técnicos:

Importa la función getAllUsers del controlador.

Ejecuta la función al recibir una solicitud HTTP.

Si la operación tiene éxito, responde con código 200 y el array de usuarios.

Si ocurre un error, responde con código 400 y el mensaje de error en formato JSON.

🔀 Flujo general
mermaid
Copy
Edit
flowchart TD
  A[Cliente] -->|GET /users| B[handlerGetAllUsers.js]
  B --> C[getAllUsers.js]
  C --> D[Base de datos]
  D --> C
  C --> B
  B -->|JSON sin contraseña| A
🧪 Muestras de prueba
🧪 GET /users
Solicitud:

bash
Copy
Edit
GET /users
Respuesta esperada:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user",
    "blocked": false,
    "createdAt": "2025-07-26T18:00:00.000Z",
    "updatedAt": "2025-07-26T18:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Ana López",
    "email": "ana@example.com",
    "role": "admin",
    "blocked": false,
    "createdAt": "2025-07-26T19:00:00.000Z",
    "updatedAt": "2025-07-26T19:00:00.000Z"
  }
]
⛔ Errores posibles
Código HTTP	Mensaje de error	Descripción técnica
400	{ "error": "..." }	Error de conexión con la base de datos, error de Sequelize, etc.

🧩 Dependencias
Archivo	Descripción
../../db	ORM Sequelize configurado, contiene el modelo User.
src/controllers/user/getAllUsers	Lógica de negocio para consultar los usuarios.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📁 src/controllers/updateUser.js
📁 src/handlers/handlerUpdateUser.js
📌 Resumen técnico
Este conjunto de módulos permite la actualización parcial o total de un usuario existente en la base de datos. El controlador updateUser.js gestiona la lógica de modificación de los atributos del usuario, mientras que el handler handlerUpdateUser.js expone esta funcionalidad mediante un endpoint HTTP PUT/PATCH.

🧩 Cuerpo técnico detallado
🔹 src/controllers/updateUser.js
js
Copy
Edit
const { User } = require('../../db');

module.exports = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  await user.update(updates);
  return user;
};
📘 Explicación técnica:
Importación: Se importa el modelo User desde la instancia de Sequelize (../../db).

Entrada: La función recibe:

id: ID único del usuario a actualizar.

updates: Objeto con las propiedades a modificar.

Proceso:

Se realiza una búsqueda con findByPk para obtener al usuario por su clave primaria.

Si no se encuentra el usuario, se lanza un error.

Si existe, se invoca el método .update(updates) para modificar las propiedades especificadas.

Salida: Devuelve el usuario actualizado (con todas sus propiedades visibles, incluyendo las modificadas).

🔹 src/handlers/handlerUpdateUser.js
js
Copy
Edit
const updateUser = require('../../controllers/user/updateUser');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateUser(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
📘 Explicación técnica:
Importación: Se importa el controlador updateUser.

Entrada HTTP:

Extrae id desde los parámetros de la URL (req.params.id).

Extrae los datos a actualizar desde el cuerpo de la solicitud (req.body).

Proceso:

Llama al controlador con los valores obtenidos.

Devuelve una respuesta HTTP con estado 200 y el usuario actualizado si todo sale bien.

Si ocurre un error, responde con 400 y el mensaje de error correspondiente.

🔀 Flujo general de actualización
mermaid
Copy
Edit
sequenceDiagram
  participant Cliente
  participant Handler
  participant Controlador
  participant BaseDatos

  Cliente->>Handler: PUT /users/:id
  Handler->>Controlador: updateUser(id, req.body)
  Controlador->>BaseDatos: User.findByPk(id)
  alt Usuario existe
    BaseDatos-->>Controlador: Usuario encontrado
    Controlador->>BaseDatos: user.update(updates)
    BaseDatos-->>Controlador: Usuario actualizado
    Controlador-->>Handler: Usuario actualizado
    Handler-->>Cliente: 200 OK + datos actualizados
  else Usuario no encontrado
    Controlador-->>Handler: Error('Usuario no encontrado')
    Handler-->>Cliente: 400 Error
  end
🧪 Muestras de prueba
✅ Ejemplo 1: Actualizar nombre del usuario
Solicitud:

bash
Copy
Edit
PUT /users/4
Content-Type: application/json

{
  "name": "Carlos Mendoza"
}
Respuesta esperada:

json
Copy
Edit
{
  "id": 4,
  "name": "Carlos Mendoza",
  "email": "carlos@example.com",
  "role": "user",
  "blocked": false,
  "createdAt": "2025-07-20T18:32:00.000Z",
  "updatedAt": "2025-07-27T15:15:30.000Z"
}
✅ Ejemplo 2: Cambiar rol del usuario
bash
Copy
Edit
PATCH /users/7
Content-Type: application/json

{
  "role": "admin"
}
⛔ Errores posibles
Código HTTP	Mensaje de error	Descripción técnica
400	Usuario no encontrado	El ID no existe en la base de datos (findByPk() falló).
400	{ "error": "..." }	Error genérico si Sequelize lanza una excepción al actualizar.

🧩 Dependencias
Archivo	Descripción
../../db	Instancia de Sequelize con definición del modelo User.
controllers/user/updateUser.js	Lógica de actualización de usuario.
handlers/handlerUpdateUser.js	Expone el controlador como endpoint HTTP.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧩 Eliminación permanente de usuarios
📁 Ubicación del código
Controlador: src/controllers/deleteUser.js

Handler: src/handlers/handlerDeleteUser.js

📌 Resumen técnico
El código implementa la eliminación permanente de un usuario de la base de datos mediante el método destroy() de Sequelize. El flujo parte desde una solicitud HTTP DELETE con un id de usuario, validando su existencia, y procediendo a su remoción definitiva del sistema. Se utiliza principalmente para funciones administrativas irreversibles.

📘 Cuerpo técnico
🔹 Estructura y Flujo General
text
Copy
Edit
[HTTP Request] → handlerDeleteUser.js → deleteUser.js → Sequelize: User.destroy()
🔹 Descripción paso a paso
📄 deleteUser.js
js
Copy
Edit
const { User } = require('../../db');

module.exports = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  await user.destroy();
  return { message: 'Usuario eliminado permanentemente' };
};
Importación de modelo User desde la instancia de Sequelize ubicada en ../../db.

Búsqueda del usuario por clave primaria (id) utilizando User.findByPk(id).

Si no se encuentra el usuario, se lanza un error manejable con el mensaje Usuario no encontrado.

Si el usuario existe, se ejecuta user.destroy() para eliminarlo definitivamente de la base de datos.

Devuelve un objeto JSON simple confirmando la eliminación.

🧩 handlerDeleteUser.js
js
Copy
Edit
const deleteUserPermanent = require('../../controllers/user/deleteUser');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserPermanent(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
Se extrae el parámetro id del request.

Se llama a deleteUserPermanent() con dicho ID.

Si la operación es exitosa, retorna 200 OK junto al mensaje de confirmación.

Si ocurre un error (por ejemplo, usuario inexistente), se responde con 400 Bad Request y el mensaje correspondiente.

🧪 Muestras de prueba
✔️ Eliminación de un usuario
Petición HTTP:

http
Copy
Edit
DELETE /users/123
Respuesta exitosa:

json
Copy
Edit
{
  "message": "Usuario eliminado permanentemente"
}
⛔ Manejo de errores
Código HTTP	Mensaje	Descripción
400	Usuario no encontrado	El ID proporcionado no corresponde a ningún usuario.
400	error: <mensaje de error>	Error inesperado en el flujo o conexión con la BD.

📦 Dependencias
Tipo	Archivo	Descripción
🧩 Modelo	db.js (exporta User)	ORM Sequelize que contiene el modelo User.
🧩 Controlador	controllers/user/deleteUser.js	Lógica para búsqueda y eliminación de usuario.
🧩 Handler	handlers/handlerDeleteUser.js	Conecta ruta HTTP con la lógica del controlador.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

