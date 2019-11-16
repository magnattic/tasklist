import { firestore } from "firebase";
import { Task } from "./task";

export const taskManager = (db: firestore.Firestore) => {
  db.disableNetwork();
  const collection = db.collection("tasks");

  return {
    getTodos: (callback: (tasks: Task[]) => void) => {
      return collection.onSnapshot(tasks =>
        callback(
          tasks.docs.map(doc => ({ id: doc.id, title: doc.get("title") }))
        )
      );
    },

    addTask: (title: string) => {
      collection.add({ title });
    },

    removeTask: (title: string) => {
      const query = collection.where("title", "==", title);
      query
        .get()
        .then(queryResult => queryResult.forEach(task => task.ref.delete()));
    }
  };
};
