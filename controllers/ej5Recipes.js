const RecipeModel = require("../models/recipe");
const { validationResult } = require("express-validator");

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find();

    res.status(200).json({ msg: "Recetas guardadas en la DB", allRecipes });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar las recetas", error });
  }
};

const getOneRecipe = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneRecipe = await RecipeModel.findOne({ _id: req.params.id });

    res.status(200).json({ msg: "Receta encontrada", oneRecipe, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar la receta", error });
  }
};

const createRecipe = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newRecipe = new RecipeModel(req.body);
    await newRecipe.save();

    res
      .status(201)
      .json({ msg: "Receta creada correctamente", newRecipe, status: 201 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear la receta", error });
  }
};

const updateRecipe = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const updateRecipe = await RecipeModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json({ msg: "Receta editada correctamente", updateRecipe });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar la receta", error });
  }
};

const deleteRecipe = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await RecipeModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ msg: "Receta eliminada correctamente", status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar la receta", error });
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
