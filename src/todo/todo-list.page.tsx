import { useEffect, useState } from "react";
import { useTodoStore } from "./todo.store";
import { Button, InputGroup } from "@blueprintjs/core";
import { Todo } from "../firebase/todo.service";
import { FetchStatus } from "../core/api.type";

export const TodoListPage = () => {
  const {
    fetchTodoList,
    createTodo,
    todoList,
    todoListFetchStatus,
    updateTodo,
    deleteTodo,
  } = useTodoStore();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
        }}
      >
        <InputGroup
          large={true}
          placeholder="Enter todo..."
          style={{
            width: "300px",
          }}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />

        <Button
          large={true}
          icon="plus"
          style={{
            borderRadius: "100px",
            marginLeft: "10px",
          }}
          onClick={() => {
            if (!todo) {
              return;
            }
            createTodo({
              name: todo,
              done: false,
              description: "",
              createdTime: new Date(),
            });
          }}
        />

        {/* button refress */}
        <Button
          large={true}
          icon="refresh"
          style={{
            borderRadius: "100px",
            marginLeft: "10px",
          }}
          onClick={() => {
            fetchTodoList();
          }}
          loading={todoListFetchStatus === FetchStatus.FETCHING}
        />
      </div>

      <TodoList
        todoList={todoList}
        toggleTodo={(todo) => {
          const { id, ...rest } = todo;

          updateTodo(id, {
            ...rest,
            done: !todo.done,
          });
        }}
        deleteTodo={(todo) => {
          deleteTodo(todo);
        }}
      />
    </div>
  );
};

const TodoList: React.FC<{
  todoList?: Todo[];
  toggleTodo?: (todo: Todo) => void;
  deleteTodo?: (todo: Todo) => void;
}> = ({ todoList, toggleTodo, deleteTodo }) => {
  return (
    <div>
      {todoList?.map((todo) => {
        return (
          <div
            key={todo.id}
            style={{
              width: "500px",
              padding: "10px",
              marginTop: "1px",
              borderBottom: "0.1px solid #ccc",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              minimal={true}
              icon={todo.done ? "tick-circle" : "circle"}
              onClick={() => {
                toggleTodo?.(todo);
              }}
            />
            <div
              style={{
                flex: 1,
              }}
            >
              {todo.name}
            </div>
            {/* cancel button */}
            <Button
              minimal={true}
              icon="cross"
              onClick={() => {
                deleteTodo?.(todo);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
