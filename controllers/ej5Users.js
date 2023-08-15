const UserModel = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();

    res
      .status(200)
      .json({ msg: "Usuarios registrados en la DB", allUsers, status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar los usuarios registrados", error });
  }
};

const getOneUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneUser = await UserModel.findOne({ _id: req.params.id });

    res.status(200).json({ msg: "Usuario encontrado", oneUser, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar el usuario", error });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(422)
        .json({ msg: "El Email ya se encuentra registrado", status: 422 });
    }
    const newUser = new UserModel(req.body);

    const salt = await bcrypt.genSaltSync();
    newUser.pass = await bcrypt.hash(req.body.pass, salt);

    await newUser.save();

    res
      .status(201)
      .json({ msg: "Usuario creado correctamente", newUser, status: 201 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el usuario", error });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({ msg: "Usuario editado correctamente", updatedUser, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await UserModel.findByIdAndDelete({ _id: req.params.id });

    res
      .status(200)
      .json({ msg: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(422).json({ msg: "El usuario no existe" });
    }

    const passCheck = await bcrypt.compare(req.body.pass, userExist.pass);

    if (passCheck) {
      const payload_jwt = {
        user: {
          id: userExist._id,
        },
      };
      const token = jwt.sign(payload_jwt, process.env.SECRET_KEY);

      res.status(200).json({msg: "Usuario logueado", userExist, token})
    } else {
      res.send({ msg: "Usuario y/o contraseña incorrectos" });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo iniciar sesión", error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
