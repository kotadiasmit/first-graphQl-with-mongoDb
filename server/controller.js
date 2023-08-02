import { Todo } from "./model.js";

const getAllTodo = async (req, res) => {
  const allTodos = await Todo.find().sort({ _id: -1 });
  return allTodos.length > 0 ? allTodos : [{ text: `no data found` }];
};

const getTodoById = (req, res) => {
  const _id = req.body;
  Todo.findById(_id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err));
};

export const todoController = {
  getAllTodo,
  getTodoById,
};
