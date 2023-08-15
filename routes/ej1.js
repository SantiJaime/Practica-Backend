const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/ej1");

router.get("/", getAllTasks);
router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneTask
);
router.post(
  "/",
  [check("nombre", "El campo nombre está vacío").notEmpty()],
  createTask
);
router.put(
  "/:id",
  [
    check("id", "Formato ID incorrecto").isMongoId(),
    check("nombre", "El campo nombre está vacío").notEmpty(),
  ],
  updateTask
);
router.delete(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteTask
);

module.exports = router;
