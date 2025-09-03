import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, loading, addTask, removeTask };
}
