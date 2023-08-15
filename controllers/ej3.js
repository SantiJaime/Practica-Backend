const ColorModel = require("../models/color");
const { validationResult } = require("express-validator");

const getAllColors = async (req, res) => {
  try {
    const allColors = await ColorModel.find();

    res.status(200).json({ msg: "Colores almacenados en la DB", allColors });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar los colores almacenados", error });
  }
};
const getOneColor = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { id } = req.params;

    const oneColor = await ColorModel.findOne({ _id: id });

    res.status(200).json({ msg: "Color seleccionado encontrado", oneColor });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar el color seleccionado", error });
  }
};
const createColor = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;

    const newColor = new ColorModel(body);
    await newColor.save();

    res.status(201).json({ msg: "Color creado correctamente", body });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el color", error });
  }
};
const updateColor = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;
    const { id } = req.params;

    const updateColor = await ColorModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    res
      .status(200)
      .json({ msg: "Color editado correctamente", updateColor, status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo editar el color seleccionado", error });
  }
};
const deleteColor = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { id } = req.params;

    await ColorModel.findByIdAndDelete({ _id: id });

    res.status(200).json({ msg: "Color eliminado correctamente", status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo eliminar el color seleccionado", error });
  }
};

module.exports = {
  getAllColors,
  getOneColor,
  createColor,
  updateColor,
  deleteColor,
};
