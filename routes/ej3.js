const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllColors,
  getOneColor,
  createColor,
  updateColor,
  deleteColor,
} = require("../controllers/ej3");

router.get("/", getAllColors);
router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneColor
);
router.post(
  "/",
  [
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check("cod", "El campo código está vacío").notEmpty(),
  ],
  createColor
);
router.put(
  "/:id",
  [
    check("id", "Formato ID incorrecto").isMongoId(),
    check("nombre", "El campo nombre está vacío").notEmpty(),
  ],
  updateColor
);
router.delete(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteColor
);

module.exports = router;
