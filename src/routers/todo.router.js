import express from "express";
const todoRouter = express.Router();

import {
  getTodoById,
  getAllTodos,
  createTodo,
} from "../controllers/todo.controller.js";

// GET
todoRouter.get("/", getAllTodos);
todoRouter.get("/all", getAllTodos);
todoRouter.get("/:id", getTodoById);

// POST
todoRouter.post("/", createTodo);

export default todoRouter;
