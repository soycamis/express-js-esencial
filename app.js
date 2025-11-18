import express from "express";
import todoRouter from "./src/routers/todo.router.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
