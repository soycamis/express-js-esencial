import { todos } from "../data/todos.js";

export const serviceGetAll = () => {
  return todos;
};

export const serviceGetTodoById = (data) => {
  const { id } = data;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    throw new Error("No se encuentra el elemento.");
  }

  return todo;
};

export const serviceCreateTodo = (data) => {
  const { title, completed = false } = data;

  if (!title) {
    throw new Error("Hace falta el valor del titulo.");
  }

  todos.push({
    id: todos.length + 1,
    title,
    completed,
  });

  return todos[todos.length - 1];
};
