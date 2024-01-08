const { response } = require("express");
const fs = require("fs");
const path = require("path");
const ModeloVistaPublicaActiva = require("../models/vista_publica_activa"); // Asegúrate de importar el modelo correcto

const crearVistaPublicaActiva = async (req, res = response) => {
  try {
    const { titulo_vista } = req.body;

    let vista = await ModeloVistaPublicaActiva.findOne({
      where: { titulo_vista },
    });

    if (vista) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos ya existe una vista con ese nombre ",
      });
    }

    vista = new ModeloVistaPublicaActiva(req.body);

    await vista.save();

    res.status(201).json({
      ok: true,
      msg: "Vista pública creada",
      vistaPublica: vista,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido insertar correctamente la vista pública",
    });
  }
};

const actualizarVistaPublicaActiva = async (req, res = response) => {
  try {
    const {
      id,
      titulo_vista,
      titulo_bienvenida,
      texto_bienvenida,
      img_informacion,
      texto_informacion,
      quienes_somos,
      direccion,
      img_1_direccion,
      img_2_direccion,
      img_3_direccion,
      footer,
    } = req.body;

    console.log({ id_que_llega_al_bakend: id });
    const vistaPublica = await ModeloVistaPublicaActiva.findOne();

    if (!vistaPublica) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ninguna vista pública para actualizar",
      });
    }

    vistaPublica.id_servicio = id;
    vistaPublica.titulo_vista = titulo_vista;
    vistaPublica.titulo_bienvenida = titulo_bienvenida;
    vistaPublica.texto_bienvenida = texto_bienvenida;
    vistaPublica.img_informacion = img_informacion;
    vistaPublica.texto_informacion = texto_informacion;
    vistaPublica.quienes_somos = quienes_somos;
    vistaPublica.direccion = direccion;
    vistaPublica.img_1_direccion = img_1_direccion;
    vistaPublica.img_2_direccion = img_2_direccion;
    vistaPublica.img_3_direccion = img_3_direccion;
    vistaPublica.footer = footer;

    await vistaPublica.save();

    console.log({ Vista_publica_guardada: vistaPublica });
    res.status(200).json({
      ok: true,
      msg: "Vista pública actualizada y Activa",
      vistaPublica: vistaPublica,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido actualizar correctamente la vista pública",
    });
  }
};

const obtenerVistaPublicaActiva = async (req, res = response) => {
  try {
    const vistasPublica = await ModeloVistaPublicaActiva.findOne();

    res.status(200).json({
      ok: true,
      msg: "Vistas pública Obtenida",
      vistaPublicaActiva: vistasPublica,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido obtener correctamente las vistas públicas",
    });
  }
};

const obtenerImagenesSolicitadas = async (req, res = response) => {
  try {
    const {
      img_informacion,
      img_1_direccion,
      img_2_direccion,
      img_3_direccion,
    } = req.body;

    console.log({
      Imagenes_Que_LLegan_del_cliente: img_informacion,
      img_1_direccion,
      img_2_direccion,
      img_3_direccion,
    });
    const imagenes = {};

    const verificarExistencia = (imageName, key) => {
      const rutaCompleta = `../images/${imageName}`;

      console.log({ Rutas_Armadas: rutaCompleta });
      if (fs.existsSync(rutaCompleta)) {
        imagenes[key] = `/images/${imageName}`;
      } else {
        imagenes[key] = null; // Opcional: Puedes establecerlo como null o algún valor predeterminado si no se encuentra la imagen.
      }
    };

    verificarExistencia(img_informacion, "img_informacion");
    verificarExistencia(img_1_direccion, "img_1_direccion");
    verificarExistencia(img_2_direccion, "img_2_direccion");
    verificarExistencia(img_3_direccion, "img_3_direccion");

    console.log({ imagenes_coincidentes_encontradas: imagenes });

    // Envía una única respuesta al cliente con todas las imágenes
    res.status(200).json({
      ok: true,
      msg: "Imagenes obtenidas con éxito",
      imagenesObtenidas: imagenes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido obtener correctamente las imagenes",
    });
  }
};

module.exports = {
  crearVistaPublicaActiva,
  actualizarVistaPublicaActiva,
  obtenerVistaPublicaActiva,
  obtenerImagenesSolicitadas,
};
