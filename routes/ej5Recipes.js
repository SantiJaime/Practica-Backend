const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllRecipes,
  createRecipe,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/ej5Recipes");
const auth = require("../middleware/auth");

router.get("/", getAllRecipes);
router.get(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  getOneRecipe
);
router.post(
  "/", auth,
  [
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check("descripcion", "El campo descripción está vacío").notEmpty(),
  ],
  createRecipe
);
router.put(
  "/:id", auth,
  [
    check("id", "Formado ID inválido").notEmpty(),
    check("nombre", "El campo nombre está vacío").notEmpty(),
    check("descripcion", "El campo descripción está vacío").notEmpty(),
  ],
  updateRecipe
);
router.delete(
  "/:id", auth,
  [check("id", "Formado ID inválido").notEmpty()],
  deleteRecipe
);

module.exports = router;
