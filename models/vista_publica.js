const { DataTypes } = require("sequelize");
const { db } = require("../database/connection");

const ModeloVistaPublica = db.define(
  "vista_publica",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    titulo_vista: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    titulo_bienvenida: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    texto_bienvenida: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img_informacion: {
      type: DataTypes.TEXT,
    },

    texto_informacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quienes_somos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img_1_direccion: {
      type: DataTypes.TEXT,
    },

    img_2_direccion: {
      type: DataTypes.TEXT,
    },

    img_3_direccion: {
      type: DataTypes.TEXT,
    },

    footer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "vista_publica",
  }
);

module.exports = ModeloVistaPublica;
