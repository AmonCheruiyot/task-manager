import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "./TaskForm";

const statusColors = {
  todo: "bg-gray-200 text-gray-700",
  in_progress: "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
};

export default function TaskDashboard() {
  const { tasks, loading, addTask, removeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  if (loading) return <p>Loading...</p>;

  const todoTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          New Task
        </button>
      </div>

      {/* Modal Popup for New Task */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Add Task</h2>
            <TaskForm
              onAdd={(task) => {
                addTask(task);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* To-Do Section */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-700">To-Do</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todoTasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[task.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3">{task.due_date || "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Section */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-green-700">Completed</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[task.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3">{task.due_date || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
