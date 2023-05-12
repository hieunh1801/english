import { useEffect } from "react";
import { useTodoStore } from "./todo.store";

export const TodoList = () => {
  const { fetchTodoList } = useTodoStore();

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  // useEffect(() => {
  //   createTodo({
  //     name: "Task 1",
  //     description: "Description 1",
  //     done: false,
  //   });
  // }, [createTodo]);

  return <div>TodoList</div>;
};
