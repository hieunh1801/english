import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore/lite";
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
        ...doc.data(),
        id: doc.id,
      };
    });
    return todoList as Todo[];
  },
  getById: async (id: string): Promise<Todo | undefined> => {
    const todoDocRef = doc(firestoreDatabase, TODO_COLLECTION, id);
    const todoDoc = await getDoc(todoDocRef);
    if (todoDoc.exists()) {
      return {
        id: todoDoc.id,
        ...todoDoc.data(),
      } as Todo;
    } else {
      return undefined;
    }
  },
  create: async (todo: TodoEditRequest): Promise<Todo> => {
    const todoCollection = todoService.getCollection();
    const todoRef = await addDoc(todoCollection, todo);
    const todoDoc = await getDoc(todoRef);
    return {
      id: todoDoc.id,
      ...todoDoc.data(),
    } as Todo;
  },
  update: async (id: string, todo: TodoEditRequest): Promise<Todo> => {
    const todoDocRef = doc(firestoreDatabase, TODO_COLLECTION, id);
    await setDoc(todoDocRef, todo, {
      merge: true,
    });

    const todoDoc = await getDoc(todoDocRef);
    return {
      id: todoDoc.id,
      ...todoDoc.data(),
    } as Todo;
  },
  delete: async (id: string): Promise<string> => {
    const todoDocRef = doc(firestoreDatabase, TODO_COLLECTION, id);
    await deleteDoc(todoDocRef);
    return id;
  },
};

export interface Todo {
  id: string;
  name: string;
  description: string;
  done: boolean;
  createdTime: Date;
}

export interface TodoEditRequest {
  name: string;
  description: string;
  done: boolean;
  createdTime: Date;
}
