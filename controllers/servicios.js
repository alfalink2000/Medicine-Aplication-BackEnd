const { response } = require("express");
const ModeloServicio = require("../models/servicios");

const path = require("path");
const fs = require("fs");

const crearServicio = async (req, res = response) => {
  try {
    const {
      categoria,
      tipo,
      nombre_centro,
      ubicacion,
      horario,
      descripcion,
      responsable,
      contacto,
      precio,
      vista_publica_id,
    } = req.body;

    // acceder al archivo en req.file

    const img_centro = req.file ? req.file.filename : null;

    let servicio = await ModeloServicio.findOne({ where: { tipo } });

    if (servicio) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos, ya existe un servicio de ese tipo ",
      });
    }

    servicio = new ModeloServicio({
      categoria,
      tipo,
      nombre_centro,
      img_centro,
      ubicacion,
      horario,
      descripcion,
      responsable,
      contacto,
      precio,
      vista_publica_id,
    });

    await servicio.save();

    res.status(201).json({
      ok: true,
      msg: "Servicio Insertado Satisfactoriamente",
      servicio: servicio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido insertar correctamente el servicio",
    });
  }
};

const actualizarServicio = async (req, res = response) => {
  try {
    const {
      id,
      categoria,
      tipo,
      nombre_centro,
      ubicacion,
      horario,
      descripcion,
      responsable,
      contacto,
      precio,
      vista_publica_id,
      urlImg,
    } = req.body;

    const img_centro = req.file ? req.file.filename : null;

    let servicio = await ModeloServicio.findOne({ where: { id } });

    if (!servicio) {
      return res.status(400).json({
        ok: false,
        msg: "Servicio seleccionado incorrecto para actualizar",
      });
    }

    servicio.id = id;
    servicio.categoria = categoria;
    servicio.tipo = tipo;
    servicio.nombre_centro = nombre_centro;
    servicio.img_centro = img_centro;
    servicio.ubicacion = ubicacion;
    servicio.horario = horario;
    servicio.descripcion = descripcion;
    servicio.responsable = responsable;
    servicio.contacto = contacto;
    servicio.precio = precio;
    servicio.vista_publica_id = vista_publica_id;

    await servicio.save();

    if (urlImg !== img_centro) {
      {
        const filePath = path.join(__dirname, "..", "images", urlImg);

        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error al eliminar la imagen antigua: ${err}`);
            }
          });
        }
      }
    }

    res.status(200).json({
      ok: true,
      msg: "Servicio Actualizado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido actualizar correctamente el servicio",
    });
  }
};

const eliminarServicio = async (req, res = response) => {
  try {
    const { id, urlImg } = req.body;
    let servicio = await ModeloServicio.findOne({ where: { id } });

    if (!servicio) {
      return res.status(400).json({
        ok: false,
        msg: "Servicio seleccionado incorrecto",
      });
    }

    await servicio.destroy();

    if (urlImg) {
      const filePath = path.join(__dirname, "..", "images", urlImg);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error al eliminar la imagen antigua: ${err}`);
          }
        });
      }
    }

    res.status(200).json({
      ok: true,
      msg: "Servicio eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido eliminar correctamente el servicio",
    });
  }
};

const getServicios = async (req, res = response) => {
  try {
    const servicios = await ModeloServicio.findAll();

    res.status(200).json({
      ok: true,
      msg: "Servicios encontrados",
      servicios: servicios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido obtener correctamente los datos de los servicios",
    });
  }
};

module.exports = {
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  getServicios,
};
