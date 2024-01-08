const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const multer = require("multer");
const path = require("path");
const router = Router();

const {
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  getServicios,
} = require("../controllers/servicios");

//Carga de imagenes
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Asigna un nombre único al archivo
  },
});

const limits = {
  fileSize: 1024 * 1024, // Tamaño máximo del archivo (1 MB)
};

const upload = multer({ storage: storage, limits: limits });

router.post(
  "/new",
  upload.single("img_centro"),
  [
    check("categoria", "La categoría es obligatoria").not().isEmpty(),
    check("tipo", "El tipo es obligatorio").not().isEmpty(),
    check("nombre_centro", "El nombre del centro es obligatorio")
      .not()
      .isEmpty(),
    check("ubicacion", "La ubicación es obligatoria").not().isEmpty(),
    check("horario", "El horario es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("responsable", "El responsable es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio")
      .not()
      .isEmpty()
      .isDecimal({ min: 0 }),
    check("vista_publica_id", "El ID de vista pública es obligatorio")
      .not()
      .isEmpty()
      .isInt({ min: 1 }),
    validarCampos,
  ],
  crearServicio
);

router.put(
  "/update",
  upload.single("img_centro"),
  [
    check("categoria", "La categoría es obligatoria").not().isEmpty(),
    check("tipo", "El tipo es obligatorio").not().isEmpty(),
    check("nombre_centro", "El nombre del centro es obligatorio")
      .not()
      .isEmpty(),
    check("ubicacion", "La ubicación es obligatoria").not().isEmpty(),
    check("horario", "El horario es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("responsable", "El responsable es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio")
      .not()
      .isEmpty()
      .isDecimal({ min: 0 }),
    check("vista_publica_id", "El ID de vista pública es obligatorio")
      .not()
      .isEmpty()
      .isInt({ min: 1 }),
    validarCampos,
  ],
  actualizarServicio
);

router.delete("/delete", eliminarServicio);

router.get("/getServices", getServicios);

module.exports = router;
