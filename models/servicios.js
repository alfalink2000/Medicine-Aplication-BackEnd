const { DataTypes } = require("sequelize");
const { db } = require("../database/connection");
const ModeloVistaPublica = require("./vista_publica");

const ModeloServicio = db.define(
  "servicio",
  {
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre_centro: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img_centro: {
      type: DataTypes.STRING, // Cambiar el tipo de dato si es más adecuado (VARCHAR, TEXT, etc.)
    },

    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    responsable: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contacto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    vista_publica_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModeloVistaPublica,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
    tableName: "servicios",
  }
);

module.exports = ModeloServicio;
