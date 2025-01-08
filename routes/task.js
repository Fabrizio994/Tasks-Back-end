import express from "express";
import {
  getAllTasks,
  addTask,
  getTaskById,
  deleteTask,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

// Definisci le route per le operazioni CRUD sui task
router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/:id", getTaskById);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;
