const { response } = require("express");
const ModeloExtranjero = require("../models/extranjeros");
const { Sequelize } = require("sequelize");

const crearExtranjero = async (req, res = response) => {
  try {
    const {
      nombre,
      edad,
      pais_residencia,
      nacionalidad,
      genero,
      direccion_particular,
      fecha_nacimiento,
      telefono,
      correo_electronico,
      local_atendido,
      solicitud_ingreso,
    } = req.body;

    let extranjero = await ModeloExtranjero.findOne({ where: { nombre } });

    if (extranjero) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos ya existe un extranjero con ese nombre ",
      });
    }

    extranjero = new ModeloExtranjero(req.body);

    await extranjero.save();

    res.status(201).json({
      ok: true,
      id: extranjero.id,
      nombre: nombre,
      edad: edad,
      pais_residencia: pais_residencia,
      nacionalidad: nacionalidad,
      genero: genero,
      direccion_particular: direccion_particular,
      fecha_nacimiento: fecha_nacimiento,
      telefono: telefono,
      correo_electronico: correo_electronico,
      local_atendido: local_atendido,
      solicitud_ingreso: solicitud_ingreso,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error , no se ha podido insertar correctamente ",
    });
  }
};

const actualizarExtranjero = async (req, res = response) => {
  try {
    const {
      id,
      nombre,
      edad,
      pais_residencia,
      nacionalidad,
      genero,
      direccion_particular,
      fecha_nacimiento,
      telefono,
      correo_electronico,
      local_atendido,
      solicitud_ingreso,
    } = req.body;

    let extranjero = await ModeloExtranjero.findOne({ where: { id } });

    if (!extranjero) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario seleccionado incorrecto para actualizar",
      });
    }

    // Actualizar los datos actuales dentro del extranjero seleccionado
    extranjero.nombre = nombre;
    extranjero.edad = edad;
    extranjero.pais_residencia = pais_residencia;
    extranjero.nacionalidad = nacionalidad;
    extranjero.genero = genero;
    extranjero.direccion_particular = direccion_particular;
    extranjero.fecha_nacimiento = fecha_nacimiento;
    extranjero.telefono = telefono;
    extranjero.correo_electronico = correo_electronico;
    extranjero.local_atendido = local_atendido;
    extranjero.solicitud_ingreso = solicitud_ingreso;

    await extranjero.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario Actualizado",
      id: id,
      nombre: nombre,
      edad: edad,
      pais_residencia: pais_residencia,
      nacionalidad: nacionalidad,
      genero: genero,
      direccion_particular: direccion_particular,
      fecha_nacimiento: fecha_nacimiento,
      telefono: telefono,
      correo_electronico: correo_electronico,
      local_atendido: local_atendido,
      solicitud_ingreso: solicitud_ingreso,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido actualizar correctamente",
    });
  }
};

const eliminarExtranjero = async (req, res = response) => {
  try {
    const { id } = req.body;
    let extranjero = await ModeloExtranjero.findOne({ where: { id } });

    if (!extranjero) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario seleccionado incorrecto",
      });
    }

    //Elimina el extranjero
    await extranjero.destroy();
    res.status(201).json({
      ok: true,
      msg: "Extranjero eliminado correctamente ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error , no se ha podido eliminar correctamente ",
    });
  }
};

const getExtranjeros = async (req, res = response) => {
  try {
    const extranjeros = await ModeloExtranjero.findAll();

    res.status(200).json({
      ok: true,
      msg: "Extranjeros encontrados",
      extranjeros: extranjeros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido obtener correctamente los datos de los extranjeros",
    });
  }
};

const getEdadDistribution = async (req, res = response) => {
  try {
    const extranjeros = await ModeloExtranjero.findAll();

    // Inicializar contadores para cada rango de edad
    let rango0_14 = 0;
    let rango15_24 = 0;
    let rango25_54 = 0;
    let rango55_64 = 0;

    // Calcular la distribución de edades
    extranjeros.forEach((extranjero) => {
      const edad = extranjero.edad;
      if (edad >= 0 && edad <= 14) {
        rango0_14++;
      } else if (edad >= 15 && edad <= 24) {
        rango15_24++;
      } else if (edad >= 25 && edad <= 54) {
        rango25_54++;
      } else if (edad >= 55 && edad < 64) {
        rango55_64++;
      }
    });

    // Crear un objeto con la distribución de edades
    const edadDistribution = {
      "0-14": rango0_14,
      "15-24": rango15_24,
      "25-54": rango25_54,
      "55-64": rango55_64,
    };

    res.status(200).json({
      ok: true,
      msg: "Distribución de edades de extranjeros",
      edadDistribution: edadDistribution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error al obtener la distribución de edades",
    });
  }
};

const obtenerPaisesResidenciaComunes = async (req, res) => {
  try {
    const paisesComunes = await ModeloExtranjero.findAll({
      attributes: [
        "pais_residencia",
        [Sequelize.fn("COUNT", Sequelize.col("pais_residencia")), "count"],
      ],
      group: ["pais_residencia"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
    });

    const resultado = paisesComunes.map((pais) => ({
      pais_residencia: pais.pais_residencia,
      cantidad: pais.get("count"),
    }));

    res.status(200).json({
      ok: true,
      msg: "Distribución de Paises mas comunes ",
      paisesComunesConteo: resultado,
    });
  } catch (error) {
    console.error("Error al obtener los países de residencia comunes:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
};

const obtenerEstadisticasExtranjeros = async (req, res) => {
  try {
    const cantidadExtranjerosRegistrados = await ModeloExtranjero.count();
    const cantidadHombres = await ModeloExtranjero.count({
      where: { genero: "Hombre" },
    });
    const cantidadMujeres = await ModeloExtranjero.count({
      where: { genero: "Mujer" },
    });
    const cantidadTrans = await ModeloExtranjero.count({
      where: { genero: "Trans" },
    });

    // const { Ingreso } = req.params; // "si" o "no" se espera como parámetro
    const cantidadExtranjerosPorIngreso = await ModeloExtranjero.count({
      where: { solicitud_ingreso: "Si" },
    });

    const localRepetido = await ModeloExtranjero.findOne({
      attributes: [
        "local_atendido",
        [Sequelize.fn("COUNT", Sequelize.col("local_atendido")), "count"],
      ],
      group: ["local_atendido"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 1,
    });

    res.status(200).json({
      ok: true,
      msg: "Estadísticas de extranjeros",
      extranjerosRegistrados: cantidadExtranjerosRegistrados,
      hombres: cantidadHombres,
      mujeres: cantidadMujeres,
      trans: cantidadTrans,
      extranjerosPorIngreso: cantidadExtranjerosPorIngreso,
      localMasRepetido: localRepetido ? localRepetido.local_atendido : null,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas de extranjeros:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
};

module.exports = {
  crearExtranjero,
  actualizarExtranjero,
  eliminarExtranjero,
  getExtranjeros,
  getEdadDistribution,
  obtenerPaisesResidenciaComunes,
  obtenerEstadisticasExtranjeros,
};
