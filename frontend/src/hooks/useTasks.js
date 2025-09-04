import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask as apiUpdateTask,
} from "../api/tasks";
import toast from "react-hot-toast";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a task
  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  // Remove a task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Update a task
  const updateTask = async (id, updatedData) => {
    try {
      // Call API to update
      const updatedTaskFromAPI = await apiUpdateTask(id, updatedData);

      // Update state locally
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updatedTaskFromAPI, // Prefer API response
                updated_at: new Date().toISOString(), // fallback if API doesn't return updated_at
              }
            : task
        )
      );

      toast.success("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return { tasks, loading, addTask, removeTask, updateTask };
}
