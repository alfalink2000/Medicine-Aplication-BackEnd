const { DataTypes } = require("sequelize");
const { db } = require("../database/connection");

const ModeloVistaPublicaActiva = db.define(
  "vista_publica_activa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "vista_publica_activa",
  }
);

module.exports = ModeloVistaPublicaActiva;
