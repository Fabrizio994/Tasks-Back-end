// controllers/task.js
import { taskSchemaModel } from "../models/task.js";

// Ottieni tutti i task
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskSchemaModel.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Aggiungi un nuovo task
export const addTask = async (req, res) => {
  const userId = req.user.id;
  const newTask = new taskSchemaModel({ ...req.body, user: userId });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Ottieni un task per ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await taskSchemaModel.findOne({ _id: id, user: userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Elimina un task per ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await taskSchemaModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Aggiorna un task per ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updates = req.body;
  try {
    const task = await taskSchemaModel.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
