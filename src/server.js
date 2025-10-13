const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes"); // tu router

const server = express();

server.use(morgan("dev"));
server.use(express.json());

// 🔹 CORS: permitir tu frontend
server.use(cors({
  origin: "http://localhost:3000", // donde corre tu React
  credentials: true,               // si usas cookies/autenticación
}));

server.use(router);

module.exports = server;