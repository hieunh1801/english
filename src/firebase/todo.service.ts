import { collection, getDocs, addDoc, doc } from "firebase/firestore/lite";
import { firestoreDatabase } from "./firebase-app";

const TODO_COLLECTION = "todos";

export const todoService = {
  getCollection: () => collection(firestoreDatabase, TODO_COLLECTION),
  getDocumentRef: () => doc(firestoreDatabase, TODO_COLLECTION),
  getAll: async () => {
    const todoCollection = todoService.getCollection();
    const snapshot = await getDocs(todoCollection);
    const todoList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    console.log(todoList);
    return todoList as Todo[];
  },
  create: async (todo: TodoCreateRequest) => {
    // const todoDocumentRef = todoService.getDocumentRef();
    const todoCollection = todoService.getCollection();
    const response = await addDoc(todoCollection, todo);
    console.log("create success", response.id);
  },
};

export interface Todo {
  id: string;
  name: string;
  description: string;
  done: boolean;
}

export interface TodoCreateRequest {
  name: string;
  description: string;
  done: boolean;
}
