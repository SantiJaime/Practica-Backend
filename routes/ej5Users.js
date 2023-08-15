const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/ej5Users");

router.get("/", getAllUsers);
router.get(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  getOneUser
);
router.post(
  "/",
  [
    check("email", "Formato email incorrecto").isEmail(),
    check("pass", "El campo contraseña está vacío").notEmpty(),
    check("pass", "Número de caracteres inválido. Min: 8 | Max: 25").isLength({
      min: 8,
      max: 25,
    }),
  ],
  createUser
);
router.post(
    "/login",
    [
      check("email", "Formato email incorrecto").isEmail(),
      check("pass", "El campo contraseña está vacío").notEmpty()
    ],
    loginUser
  );
router.put(
  "/:id",
  [
    check("id", "Formado ID inválido").isMongoId(),
    check("email", "Formato email incorrecto").isEmail(),
    check("pass", "El campo contraseña está vacío").notEmpty(),
    check("pass", "Número de caracteres inválido. Min: 8 | Max: 25").isLength({
      min: 8,
      max: 25,
    }),
  ],
  updateUser
);
router.delete(
  "/:id",
  [check("id", "Formado ID inválido").isMongoId()],
  deleteUser
);

module.exports = router