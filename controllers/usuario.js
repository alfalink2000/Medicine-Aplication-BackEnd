const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const ModeloUsuario = require("../models/usuario");
const { body } = require("express-validator");

const crearUsuario = async (req, res = response) => {
  try {
    const { name_user, password_user } = req.body;
    let usuario = await ModeloUsuario.findOne({ where: { name_user } });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos ya existe un usuario con ese nombre ",
      });
    }

    usuario = new ModeloUsuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password_user = bcrypt.hashSync(password_user, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      id: usuario.id,
      usuario: name_user,
      password_user: password_user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  try {
    const { name_user, password_user } = req.body;
    const usuario = await ModeloUsuario.findOne({ where: { name_user } });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecta",
      });
    }

    const validPassword = bcrypt.compareSync(
      password_user,
      usuario.password_user
    );

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecta",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name_user);

    res.status(201).json({
      ok: true,
      msg: "Acceso Concedido",
      id: usuario.id,
      usuario: name_user,
      password_user: password_user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Usuario y contraseña incorrectos ",
    });
  }
};

const actualizarAdmin = async (req, res = response) => {
  try {
    const { id, email, name_user, password_user, new_password } = req.body;
    const usuario = await ModeloUsuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario incorrecto",
      });
    }

    const validPassword = bcrypt.compareSync(
      password_user,
      usuario.password_user
    );

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Lo sentimos contraseña actual no es correcta",
      });
    }

    const salt = bcrypt.genSaltSync();
    const hashedNewPassword = bcrypt.hashSync(new_password, salt);

    // Actualizar la contraseña en la base de datos con la nueva contraseña
    usuario.name_user = name_user;
    usuario.email = email;
    usuario.password_user = hashedNewPassword;

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario Actualizado",
      id: usuario.id,
      email: email,
      usuario: usuario.name_user,
      password_user: new_password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);

  res.status(201).json({
    ok: true,
    msg: "renew ok",
    uid: uid,
    name: name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  actualizarAdmin,
  revalidarToken,
};
