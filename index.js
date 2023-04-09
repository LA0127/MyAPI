const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config({ path: './datos.env' });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexión a la base de datos exitosa");
});

app.get("/api/peliculas", (req, res) => {
    const sql = "SELECT peliculas.id, peliculas.titulo, peliculas.ano, peliculas.genero, directores.nombre as director FROM peliculas INNER JOIN directores ON peliculas.director_id = directores.id";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  app.get("/api/peliculas/buscar/:termino", (req, res) => {
    const terminoBusqueda = req.params.termino;
    const sql = "SELECT peliculas.id, peliculas.titulo, peliculas.ano, peliculas.genero, directores.nombre as director FROM peliculas INNER JOIN directores ON peliculas.director_id = directores.id WHERE peliculas.titulo LIKE ?";
    db.query(sql, [`%${terminoBusqueda}%`], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});    