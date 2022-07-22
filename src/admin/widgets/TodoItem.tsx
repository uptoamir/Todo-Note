import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ITodo, TodoProps, ApiDataType } from "../types/todo";
import "./todoItem.css";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  const theme = useTheme();

  return (
    <div
      className="Card"
      style={theme.palette.mode === "light" ? { background: "#4444446e" } : {}}
    >
      <div className="Card--text" id="container">
        <h1
          style={theme.palette.mode === "light" ? { color: "#37474F" } : {}}
          className={checkTodo}
        >
          {todo.name}
        </h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={
            todo.status ? `Card--button__undone` : "Card--button__done"
          }
        >
          {todo.status ? "Unomplete" : "Complete"}
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
