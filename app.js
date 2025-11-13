import express from "express";

import { todos } from "./data/todos.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send(`<h1>app.js</h1>`);
});

app.get("/todos", (req, res) => {
  const { completed } = req.query;

  if (!completed) {
    res.status(400).send(`<h1>Parameter "completed" is required</h1>`);
    return;
  }

  const filteredTodos = todos.filter(
    (todo) => String(todo.completed) === completed
  );

  res.status(200).send(`
    <style>
      body {
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
      }
    </style>
    <h1>Todos</h1>
    <ul>
      ${filteredTodos.map((todo) => `<li>${todo.title}</li>`).join("")}
    </ul>
  `);
});

app.get("/todos/all", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200);
  res.send(`
    <style>
      body {
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        padding: 10px;
      }
      li.completed {
        text-decoration: line-through;
        color: #ccc;
      }
    </style>
    <h1>Todos</h1>
    <ul>
      ${todos
        .map(
          (todo) =>
            `<li class="${todo.completed ? "completed" : ""}">${
              todo.title
            }</li>`
        )
        .join("")}
    </ul>
    `);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) res.status(404).send(`<h1>Todo not found</h1>`);

  res.status(200);
  res.send(`
    <style>
      body {
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
      }
    </style>
    <h1>Todo</h1>
    <p>${todo.title}</p>
    <p>Completed: ${todo.completed ? "✅" : "❌"}</p>
    `);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const updateTodo = todos.findIndex((todo) => todo.id === parseInt(id));

  if (updateTodo === -1) {
    res.status(404).send(`<h1>Todo not found</h1>`);
    return;
  }

  todos[updateTodo] = {
    ...todos[updateTodo],
    completed,
  };

  res.status(200).send(`<h1>Todo updated</h1>`);
});

app.post("/todos", (req, res) => {
  const { title, completed = false } = req.body;

  const newTodo = {
    id: todos.length + 1,
    title,
    completed,
  };

  todos.push(newTodo);
  console.log(todos);
  res.status(201).send(`<h1>Todo created</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
