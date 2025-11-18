import {
  serviceGetAll,
  serviceCreateTodo,
  serviceGetTodoById,
} from "../services/todo.service.js";

import { todos } from "../data/todos.js";

export const getAllTodos = (req, res) => {
  try {
    const all = serviceGetAll();
    return res.status(200).json({
      items: all.length,
      data: all,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getTodoById = (req, res) => {
  try {
    const todo = serviceGetTodoById(req.params);
    return res.status(200).json({
      data: todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createTodo = (req, res) => {
  try {
    const result = serviceCreateTodo(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
