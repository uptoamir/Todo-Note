import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { ITodo } from "../types/todo";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const theme = useTheme();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  console.log(theme.palette.mode);
  return (
    <form
      style={theme.palette.mode === "light" ? { background: "#4444446e" } : {}}
      className="Form"
      onSubmit={(e) => saveTodo(e, formData)}
    >
      <div>
        <div>
          <label
            style={
              theme.palette.mode === "light"
                ? { color: "#37474F" }
                : { color: "#ffff" }
            }
            htmlFor="name"
          >
            Name
          </label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label
            style={
              theme.palette.mode === "light"
                ? { color: "#37474F" }
                : { color: "#ffff" }
            }
            htmlFor="description"
          >
            Description
          </label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
