import { create } from "zustand";
import { Todo, TodoEditRequest, todoService } from "../firebase/todo.service";
import { FetchStatus } from "../core/api.type";

interface TodoStoreInterface {
  todoList?: Todo[];
  todoListFetchStatus?: FetchStatus;
  todoListFetchError?: any;
  fetchTodoList: () => Promise<void>;
  createTodo: (todo: TodoEditRequest) => Promise<void>;
  updateTodo: (id: string, todo: TodoEditRequest) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
}

export const useTodoStore = create<TodoStoreInterface>((set) => {
  console.log("init todoStore");
  return {
    todoList: undefined,
    fetchTodoList: async () => {
      try {
        set({ todoListFetchStatus: FetchStatus.FETCHING });
        const todoList = await todoService.getAll();
        set({ todoList: todoList });
      } catch (error) {
        set({
          todoListFetchStatus: FetchStatus.FAILURE,
          todoListFetchError: error,
        });
      } finally {
        set({ todoListFetchStatus: FetchStatus.SUCCESS });
      }
    },
    createTodo: async (todo: TodoEditRequest) => {
      const createdTodo = await todoService.create(todo);
      set((state) => ({
        todoList: [createdTodo, ...(state.todoList || [])],
      }));
    },
    updateTodo: async (id: string, todo: TodoEditRequest) => {
      const updatedTodo = await todoService.update(id, todo);

      set((state) => {
        const todoList = state.todoList || [];
        const index = todoList.findIndex((t) => t.id === id);
        if (index >= 0) {
          todoList[index] = updatedTodo;
        }
        return { todoList: todoList };
      });
    },
    deleteTodo: async (todo: Todo) => {
      await todoService.delete(todo.id);
      set((state) => {
        const todoList = state.todoList || [];
        const index = todoList.findIndex((t) => t.id === todo.id);
        if (index >= 0) {
          todoList.splice(index, 1);
        }
        return { todoList: todoList };
      });
    },
  };
});
