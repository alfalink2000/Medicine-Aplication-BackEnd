require("dotenv").config();
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT} `);
});

connection();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/", express.static(path.join(__dirname, "./images")));

app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/extranjero", require("./routes/extranjeros"));
app.use("/api/vista_publica", require("./routes/vista_publica"));
app.use("/api/services", require("./routes/servicios"));
app.use("/api/vista_activa", require("./routes/vista_publica_activa"));
