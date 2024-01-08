const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

const {
  crearExtranjero,
  actualizarExtranjero,
  eliminarExtranjero,
  getExtranjeros,
  getEdadDistribution,
  obtenerPaisesResidenciaComunes,
  obtenerEstadisticasExtranjeros,
} = require("../controllers/extranjeros");

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty().isInt({ min: 1 }),
    check("pais_residencia", "El país de residencia es obligatorio")
      .not()
      .isEmpty(),
    check("nacionalidad", "La nacionalidad es obligatoria").not().isEmpty(),
    check("genero", "El género es obligatorio").not().isEmpty(),
    check("direccion_particular", "La dirección particular es obligatoria")
      .not()
      .isEmpty(),
    check("fecha_nacimiento", "La fecha de nacimiento es obligatoria")
      .not()
      .isEmpty()
      .isDate(),
    check("solicitud_ingreso", "La solicitud de ingreso es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearExtranjero
);

router.put(
  "/update",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty().isInt({ min: 1 }),
    check("pais_residencia", "El país de residencia es obligatorio")
      .not()
      .isEmpty(),
    check("nacionalidad", "La nacionalidad es obligatoria").not().isEmpty(),
    check("genero", "El género es obligatorio").not().isEmpty(),
    check("direccion_particular", "La dirección particular es obligatoria")
      .not()
      .isEmpty(),
    check("fecha_nacimiento", "La fecha de nacimiento es obligatoria")
      .not()
      .isEmpty()
      .isDate(),
    check("solicitud_ingreso", "La solicitud de ingreso es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  actualizarExtranjero
);

router.delete("/delete", eliminarExtranjero);

router.get("/getExtranjeros", getExtranjeros);

router.get("/getEdadDistribution", getEdadDistribution);

router.get("/getPaisesComunes", obtenerPaisesResidenciaComunes);

router.get("/obtenerEstadisticasExtranjeros", obtenerEstadisticasExtranjeros);

module.exports = router;
