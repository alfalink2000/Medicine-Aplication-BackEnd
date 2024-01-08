const { response } = require("express");
const ModeloVistaPublica = require("../models/vista_publica");
const ModeloServicio = require("../models/servicios");

const path = require("path");
const fs = require("fs");

const crearVistaPublica = async (req, res = response) => {
  try {
    const {
      titulo_vista,
      titulo_bienvenida,
      texto_bienvenida,
      texto_informacion,
      quienes_somos,
      direccion,
      footer,
    } = req.body;

    const img_informacion =
      req.files && req.files["img_informacion"]
        ? `${req.files["img_informacion"][0].filename}`
        : null;

    const img_1_direccion =
      req.files && req.files["img_1_direccion"]
        ? `${req.files["img_1_direccion"][0].filename}`
        : null;

    const img_2_direccion =
      req.files && req.files["img_2_direccion"]
        ? `${req.files["img_2_direccion"][0].filename}`
        : null;

    const img_3_direccion =
      req.files && req.files["img_3_direccion"]
        ? `${req.files["img_3_direccion"][0].filename}`
        : null;

    let vista = await ModeloVistaPublica.findOne({ where: { titulo_vista } });

    if (vista) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos, ya existe una vista con ese nombre",
      });
    }

    vista = new ModeloVistaPublica({
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
    });

    await vista.save();

    const lastInsertedId = vista.get("id");

    res.status(201).json({
      ok: true,
      msg: "Vista pública creada",
      vistaPublica: vista,
      lastInsertedId: lastInsertedId,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido insertar correctamente la vista pública",
    });
  }
};

const crearServiciosVistaPublicaNueva = async (req, res = response) => {
  try {
    const {
      categoria0,
      tipo0,
      nombre_centro0,
      ubicacion0,
      horario0,
      descripcion0,
      responsable0,
      precio0,
      numeroMaximoDeObjetos,
      idUltimaVista,
    } = req.body;

    console.log(`Número máximo de objetos: ${numeroMaximoDeObjetos}`);

    const servicios = [];

    // Recarga los servicios que llega para añadirlos

    if (numeroMaximoDeObjetos === 1) {
      const img_centro =
        req.files && req.files["img_centro0"]
          ? `${req.files["img_centro0"][0].filename}`
          : null;

      await ModeloServicio.create({
        categoria0,
        tipo0,
        nombre_centro0,
        img_centro,
        ubicacion0,
        horario0,
        descripcion0,
        responsable0,
        precio0,
        vista_publica_id: idUltimaVista,
      });

      // servicioCreadoUnico.save();
    }

    // } else {
    //   for (let i = 1; i <= numeroMaximoDeObjetos; i++) {
    //     const serviciosMasdUno = {
    //       categoria: req.body[`categoria${i - 1}`],
    //       tipo: req.body[`tipo${i - 1}`],
    //       nombre_centro: req.body[`nombre_centro${i - 1}`],
    //       img_centro: req.files[i - 1] ? req.files[i - 1].filename : "",
    //       ubicacion: req.body[`ubicacion${i - 1}`],
    //       horario: req.body[`horario${i - 1}`],
    //       descripcion: req.body[`descripcion${i - 1}`],
    //       responsable: req.body[`responsable${i - 1}`],
    //       precio: req.body[`precio${i - 1}`],
    //     };

    //     servicios.push(serviciosMasdUno);
    //   }

    // console.log({ Los_Servicios_a_insertar_son: servicios });

    // await ModeloServicio.bulkCreate(servicios);

    // servicioCreado.save();

    res.status(201).json({
      ok: true,
      msg: "Servicios creados",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error al crear los servicios",
    });
  }
};

const actualizarVistaPublica = async (req, res = response) => {
  try {
    const {
      id,
      titulo_vista,
      titulo_bienvenida,
      texto_bienvenida,
      texto_informacion,
      quienes_somos,
      direccion,
      footer,
      urlImg,
      urlImg1,
      urlImg2,
      urlImg3,
    } = req.body;

    // Obtener rutas de las imágenes antiguas antes de la actualización
    const img_informacionAntigua = urlImg;
    const img_1_direccionAntigua = urlImg1;
    const img_2_direccionAntigua = urlImg2;
    const img_3_direccionAntigua = urlImg3;

    console.log(
      img_informacionAntigua,
      img_1_direccionAntigua,
      img_2_direccionAntigua,
      img_3_direccionAntigua
    );

    const img_informacion =
      req.files && req.files["img_informacion"]
        ? `${req.files["img_informacion"][0].filename}`
        : null;

    const img_1_direccion =
      req.files && req.files["img_1_direccion"]
        ? `${req.files["img_1_direccion"][0].filename}`
        : null;

    const img_2_direccion =
      req.files && req.files["img_2_direccion"]
        ? `${req.files["img_2_direccion"][0].filename}`
        : null;

    const img_3_direccion =
      req.files && req.files["img_3_direccion"]
        ? `${req.files["img_3_direccion"][0].filename}`
        : null;

    let vistaPublica = await ModeloVistaPublica.findOne({ where: { id } });

    if (!vistaPublica) {
      return res.status(400).json({
        ok: false,
        msg: "No se encuentra la vista publica a modificar",
      });
    }

    vistaPublica.id = id;
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

    // const filePath = path.join(  __dirname, `../images/${img_2_direccionAntigua}`);

    if (img_informacionAntigua !== img_informacion) {
      if (img_informacionAntigua) {
        const filePath = path.join(
          __dirname,
          "..",
          "images",
          img_informacionAntigua
        );

        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error al eliminar la imagen antigua: ${err}`);
            }
          });
        }
      }
    }

    if (img_1_direccionAntigua !== img_informacion) {
      if (img_1_direccionAntigua) {
        const filePath = path.join(
          __dirname,
          "..",
          "images",
          img_1_direccionAntigua
        );
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error al eliminar la imagen antigua: ${err}`);
            }
          });
        }
      }
    }

    if (img_2_direccionAntigua !== img_informacion) {
      if (img_2_direccionAntigua) {
        const filePath = path.join(
          __dirname,
          "..",
          "images",
          img_2_direccionAntigua
        );
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error al eliminar la imagen antigua: ${err}`);
            }
          });
        }
      }
    }

    if (img_3_direccionAntigua !== img_informacion) {
      if (img_3_direccionAntigua) {
        const filePath = path.join(
          __dirname,
          "..",
          "images",
          img_3_direccionAntigua
        );
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
      msg: "Vista pública actualizada",
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

const eliminarVistaPublica = async (req, res = response) => {
  try {
    const { id, urlImg, urlImg1, urlImg2, urlImg3 } = req.body;

    let vistaPublica = await ModeloVistaPublica.findOne({ where: { id } });

    if (!vistaPublica) {
      return res.status(400).json({
        ok: false,
        msg: "La vista publica no existe",
      });
    }

    await vistaPublica.destroy();

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

    if (urlImg1) {
      const filePath = path.join(__dirname, "..", "images", urlImg1);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error al eliminar la imagen antigua: ${err}`);
          }
        });
      }
    }
    if (urlImg2) {
      const filePath = path.join(__dirname, "..", "images", urlImg2);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error al eliminar la imagen antigua: ${err}`);
          }
        });
      }
    }
    if (urlImg3) {
      const filePath = path.join(__dirname, "..", "images", urlImg3);

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
      msg: "Vista pública eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido eliminar correctamente la vista pública",
    });
  }
};

const obtenerVistasPublicas = async (req, res = response) => {
  try {
    const vistasPublicas = await ModeloVistaPublica.findAll();

    res.status(200).json({
      ok: true,
      msg: "Vistas públicas encontradas",
      vistasPublicas: vistasPublicas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, no se ha podido obtener correctamente las vistas públicas",
    });
  }
};

module.exports = {
  crearVistaPublica,
  actualizarVistaPublica,
  eliminarVistaPublica,
  obtenerVistasPublicas,
  crearServiciosVistaPublicaNueva,
};
