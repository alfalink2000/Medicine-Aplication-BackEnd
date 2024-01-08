const { DataTypes } = require("sequelize");

const { db } = require("../database/connection");

const ModeloUsuario = db.define(
  "usuario",
  {
    //db.define ('nombre del modelo identico al de la base de datos ' , {campos y atributos})

    name_user: {
      type: DataTypes.STRING,
      require: true,
    },

    email: {
      type: DataTypes.STRING,
      require: true,
      unique: true, //Asignamos que el email debe ser unico
    },

    password_user: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  {
    timestamps: false, // Quitar timestamps automáticamente
    tableName: "usuario", // Especificar el nombre de la tabla en singular
  }
);

module.exports = ModeloUsuario;
