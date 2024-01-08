const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const multer = require("multer");
const path = require("path");
const router = Router();

const {
  crearVistaPublica,
  actualizarVistaPublica,
  eliminarVistaPublica,
  obtenerVistasPublicas,
  crearServiciosVistaPublicaNueva,
} = require("../controllers/vista_publica");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024, // Tamaño máximo del archivo (1 MB)
};

const upload = multer({ storage: storage, limits: limits });

router.post(
  "/new",
  upload.fields([
    { name: "img_informacion", maxCount: 1 },
    { name: "img_1_direccion", maxCount: 1 },
    { name: "img_2_direccion", maxCount: 1 },
    { name: "img_3_direccion", maxCount: 1 },
  ]),
  [
    check("titulo_vista", "El título de la vista es obligatorio")
      .not()
      .isEmpty(),
    check("titulo_bienvenida", "El título de bienvenida es obligatorio")
      .not()
      .isEmpty(),
    check("texto_bienvenida", "El texto de bienvenida es obligatorio")
      .not()
      .isEmpty(),
    check("texto_informacion", "El texto de información es obligatorio")
      .not()
      .isEmpty(),
    check("quienes_somos", "El campo Quiénes Somos es obligatorio")
      .not()
      .isEmpty(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
    check("footer", "El campo de pie de página es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearVistaPublica
);

router.post(
  "/adjuntServices",
  upload.single("img_centro0"),
  crearServiciosVistaPublicaNueva
);

router.put(
  "/update",
  upload.fields([
    { name: "img_informacion", maxCount: 1 },
    { name: "img_1_direccion", maxCount: 1 },
    { name: "img_2_direccion", maxCount: 1 },
    { name: "img_3_direccion", maxCount: 1 },
  ]),
  [
    check("titulo_vista", "El título de la vista es obligatorio")
      .not()
      .isEmpty(),
    check("titulo_bienvenida", "El título de bienvenida es obligatorio")
      .not()
      .isEmpty(),
    check("texto_bienvenida", "El texto de bienvenida es obligatorio")
      .not()
      .isEmpty(),
    check("texto_informacion", "El texto de información es obligatorio")
      .not()
      .isEmpty(),
    check("quienes_somos", "El campo Quiénes Somos es obligatorio")
      .not()
      .isEmpty(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),

    check("footer", "El campo de pie de página es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarVistaPublica
);

router.delete("/delete", eliminarVistaPublica);

router.get("/vista_publica", obtenerVistasPublicas);

module.exports = router;
