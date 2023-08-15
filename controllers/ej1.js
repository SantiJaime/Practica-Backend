const TaskModel = require("../models/task");
const { validationResult } = require("express-validator");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find();

    res.status(200).json({ msg: "Tareas almacenadas en la DB", allTasks });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar las tareas almacenadas", error });
  }
};
const getOneTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { id } = req.params;

    const oneTask = await TaskModel.findOne({ _id: id });

    res.status(200).json({ msg: "Tarea seleccionada encontrada", oneTask });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo encontrar la tarea seleccionada", error });
  }
};
const createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;

    const newTask = new TaskModel(body);
    await newTask.save();

    res.status(201).json({ msg: "Tarea creada correctamente", body });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear la tarea", error });
  }
};
const updateTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;
    const { id } = req.params;

    const updateTask = await TaskModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    res
      .status(200)
      .json({ msg: "Tarea editada correctamente", updateTask, status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo editar la tarea seleccionada", error });
  }
};
const deleteTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { id } = req.params;

    await TaskModel.findByIdAndDelete({ _id: id });

    res.status(200).json({ msg: "Tarea eliminada correctamente", status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudo eliminar la tarea seleccionada", error });
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
