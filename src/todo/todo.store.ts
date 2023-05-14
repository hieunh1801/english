import { create } from "zustand";
import { Todo, TodoEditRequest, todoService } from "../firebase/todo.service";
import { FetchStatus } from "../core/api.type";
import { doc } from "firebase/firestore";

type State = {
  todoList?: Todo[];
  todoListFetchStatus?: FetchStatus;
  todoListFetchError?: any;
};

interface Actions {
  fetchTodoList: () => Promise<void>;
  createTodo: (todo: TodoEditRequest) => Promise<void>;
  updateTodo: (id: string, todo: TodoEditRequest) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
}

export const useTodoStore = create<State & Actions>((set, get) => {
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
      // append to top
      set((state) => ({
        todoList: [createdTodo, ...(state.todoList || [])],
      }));
      // get().fetchTodoList();
    },
    updateTodo: async (id: string, todo: Todo) => {
      console.log("updateTodo", todo);
      const updatedTodo = await todoService.update(id, todo);

      // update todoList
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
      console.log("deleteTodo", todo);
      await todoService.delete(todo.id);

      // update todoList
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
