const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

const {
  crearVistaPublicaActiva,
  actualizarVistaPublicaActiva,
  obtenerVistaPublicaActiva,
  obtenerImagenesSolicitadas,
} = require("../controllers/vista_publica_activa");

router.post(
  "/new",
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
  crearVistaPublicaActiva
);

router.put(
  "/update",
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
  actualizarVistaPublicaActiva
);

router.get("/vista_publica_activa", obtenerVistaPublicaActiva);

router.post("/imagesObtener", obtenerImagenesSolicitadas);

module.exports = router;
