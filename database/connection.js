const { Sequelize } = require("sequelize");

const db = new Sequelize("medicalsql", "root", "Kd86natsuD", {
  //El primmero es el nombre de mi base de datos y el usuario y contraseña es (root) , (vacio) para el password
  host: "localhost",
  dialect: "mysql",
  //loging:'false'
});

const connection = async () => {
  try {
    db.authenticate(); //Verifica que se conecte correctamente
    console.log("Database online"); //Si se conecta envia este mensaje por consola
  } catch (error) {
    throw new Error("Error al inicializar la base de datos");
  }
};

module.exports = {
  connection,
  db,
};
