import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../widgets/TodoItem";
import AddTodo from "../widgets/AddTodo";
import { ITodo } from "../types/todo";
import { ADD_TODO, DELETE_TODO, CHANGE_TODO_STATUS } from "../../store/actions";
import type { RootState } from "../../store";
import { saveTodo } from "../../store/actionCreators/saveTodo";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Todo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.todo);
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    console.log(data);
    if (data.data) setTodos(data.data);
  };

  const handleSaveTodo = async (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault();
    const temp = [...todos];
    console.log(formData);
    let myuuid = uuid();
    const obj = {
      _id: myuuid,
      name: formData.name,
      description: formData.description,
      status: false,
    };
    temp.push(obj);
    setTodos(temp);
    console.log(obj);

    await dispatch<any>({ type: ADD_TODO, payload: obj });
    //    addTodo(formData)
    //    .then(({ status, data }) => {
    //     if (status !== 201) {
    //       throw new Error('Error! Todo not saved')
    //     }
    //     setTodos(data.todos)
    //   })
    //   .catch((err) => console.log(err))
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    console.log(todo);
    const indexU = todos.findIndex((item) => item._id === todo._id);
    const temp = [...todos];
    temp[indexU] = { ...temp[indexU], status: !temp[indexU].status };
    setTodos(temp);
    dispatch({ type: CHANGE_TODO_STATUS, payload: { _id: todo._id } });
  };

  const handleDeleteTodo = (_id: string): void => {
    let temp = [...todos];
    temp = temp.filter((item) => item._id !== _id);
    setTodos(temp);
    dispatch({ type: DELETE_TODO, payload: { _id } });
    //    addTodo(formData)
  };

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      <div className="todo__menu">
        <ul>
          {todos.map((todo: ITodo) => (
            <TodoItem
              key={todo._id}
              updateTodo={handleUpdateTodo}
              deleteTodo={handleDeleteTodo}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Todo;
