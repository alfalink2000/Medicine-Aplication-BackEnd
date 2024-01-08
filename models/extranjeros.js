const { DataTypes } = require("sequelize");
const { db } = require("../database/connection");

const ModeloExtranjero = db.define(
  "extranjero",
  {
    nombre: {
      type: DataTypes.STRING,
      require: true,
    },

    edad: {
      type: DataTypes.INTEGER,
      require: true,
    },

    pais_residencia: {
      type: DataTypes.STRING,
      require: true,
    },

    nacionalidad: {
      type: DataTypes.STRING,
      require: true,
    },

    genero: {
      type: DataTypes.STRING,
      require: true,
    },

    direccion_particular: {
      type: DataTypes.STRING,
      require: true,
    },

    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      require: true,
    },

    telefono: {
      type: DataTypes.STRING,
      require: true,
    },

    correo_electronico: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },

    local_atendido: {
      type: DataTypes.STRING,
      require: true,
    },

    solicitud_ingreso: {
      type: DataTypes.BOOLEAN,
      require: true,
    },
  },
  {
    timestamps: false,
    tableName: "extranjeros",
  }
);

module.exports = ModeloExtranjero;
