import { collection, getDocs, doc, addDoc } from "firebase/firestore/lite";
import { firestoreDatabase } from "./firebase-app";

const TODO_COLLECTION = "todos";
// const todoCollection = collection(firestoreDatabase, TODO_COLLECTION);
// const todoDocumentRef = doc(firestoreDatabase, TODO_COLLECTION);

export const todoService = {
  getCollection: () => collection(firestoreDatabase, TODO_COLLECTION),
  getDocumentRef: () => doc(firestoreDatabase, TODO_COLLECTION),
  getAll: async () => {
    const todoCollection = todoService.getCollection();
    const snapshot = await getDocs(todoCollection);
    console.log("snapshot", snapshot.docs);
    const todoList = snapshot.docs.map((doc) => doc.data());
    console.log(todoList);
    return todoList as Todo[];
  },
  create: async (todo: TodoCreateRequest) => {
    // const todoDocumentRef = todoService.getDocumentRef();
    const todoCollection = todoService.getCollection();
    const response = await addDoc(todoCollection, todo);
    console.log("create success", response);
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
