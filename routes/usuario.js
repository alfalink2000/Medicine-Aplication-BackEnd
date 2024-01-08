/* Rutas de Usuario , localhost:4000/api/usuario/ */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/revalidar-jwt");
const router = Router();

const {
  crearUsuario,
  loginUsuario,
  actualizarAdmin,
  revalidarToken,
} = require("../controllers/usuario");

router.post(
  "/new",
  [
    check("name_user", "El nombre es obligatorio").not().isEmpty(), //Verifica si el campo no esta vacio
    check("password_user", "El password debe contener al menos 6 digitos"),
    check("password_user", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("name_user", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password_user",
      check("password_user", "El nombre es obligatorio").not().isEmpty()
    ),
    validarCampos,
  ],
  loginUsuario
);

router.put(
  "/update",
  [
    check("name_user", "El nombre es obligatorio").not().isEmpty(),
    check("password_user", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarAdmin
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
