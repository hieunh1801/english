import { create } from "zustand";
import { Todo, TodoCreateRequest, todoService } from "../firebase/todo.service";

type State = {
  todoList?: Todo[];
};

interface Actions {
  fetchTodoList: () => Promise<void>;
  createTodo: (todo: TodoCreateRequest) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
}

export const useTodoStore = create<State & Actions>((set, get) => {
  console.log("init todoStore");
  return {
    todoList: undefined,
    fetchTodoList: async () => {
      const todoList = await todoService.getAll();
      set({ todoList: todoList });
    },
    createTodo: async (todo: TodoCreateRequest) => {
      await todoService.create(todo);
      get().fetchTodoList();
    },
    updateTodo: async (todo: Todo) => {
      console.log("updateTodo", todo);
      // await todoService.update(todo);
      get().fetchTodoList();
    },
    deleteTodo: async (todo: Todo) => {
      console.log("deleteTodo", todo);
      // await todoService.delete(todo);
      get().fetchTodoList();
    },
  };
});
