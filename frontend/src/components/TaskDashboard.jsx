import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "./TaskForm";
import AnalyticsDashboard from "./AnalyticsDashboard";
import TaskDetails from "./TaskDetails";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Format status for display
const formatStatus = (status) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

// Better date formatting (with time)
const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function TaskDashboard({
  setPage,
  selectedTask,
  setSelectedTask,
  page,
}) {
  const { tasks, loading, addTask, removeTask, updateTask } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Undo/Notification state
  const [notification, setNotification] = useState(null);
  const [deletedTask, setDeletedTask] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  const showNotification = (msg, undoTask = null) => {
    setNotification(msg);
    if (undoTask) setDeletedTask(undoTask);

    if (undoTimeout) clearTimeout(undoTimeout);

    const timeout = setTimeout(() => {
      setNotification(null);
      setDeletedTask(null);
    }, 3000);

    setUndoTimeout(timeout);
  };

  const handleDelete = (task) => {
    removeTask(task.id);
    showNotification(`🗑️ Task "${task.title}" deleted`, task);
  };

  const handleUndo = () => {
    if (deletedTask) {
      addTask(deletedTask);
      setDeletedTask(null);
      setNotification("✅ Task restored");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todoTasks = filteredTasks.filter((t) => t.status !== "done");
  const completedTasks = filteredTasks.filter((t) => t.status === "done");

  const handleOpenTask = (task) => {
    setSelectedTask(task);
    setPage("taskDetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans relative">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 text-sm text-gray-800 animate-fadeIn z-50 flex items-center gap-4">
          <span>{notification}</span>
          {deletedTask && (
            <button
              onClick={handleUndo}
              className="text-blue-600 font-medium hover:underline"
            >
              Undo
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Task Manager
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-100 transition-all duration-300"
          >
            <PlusCircleIcon className="h-5 w-5" />
            New Task
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters + Analytics */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Filter Tasks
              </h3>
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative w-full">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-12 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none cursor-pointer focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="all">All</option>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <AnalyticsDashboard tasks={tasks} />
          </div>

          {/* Task Lists */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* To-Do */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                To-Do
              </h2>
              <div className="space-y-4">
                {todoTasks.length > 0 ? (
                  todoTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-5 bg-white rounded-2xl shadow-md border-l-4 border-blue-500 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-gray-50 hover:shadow-lg"
                      onClick={() => handleOpenTask(task)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-800 truncate">
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Due: {formatDate(task.due_date)}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4 flex flex-row items-center gap-2 text-right">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColors[task.status]}`}
                        >
                          {formatStatus(task.status)}
                        </span>
                        {/* Update Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTask(task);
                          }}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-1"
                        >
                          ✎
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(task);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 p-6 border rounded-xl bg-gray-50 flex flex-col items-center">
                    <ClipboardDocumentCheckIcon className="h-10 w-10 mb-2 text-gray-400" />
                    No tasks found
                  </div>
                )}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-green-700 border-b border-gray-200 pb-2">
                Completed
              </h2>
              <div className="space-y-4">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-5 bg-white rounded-2xl shadow-md border-l-4 border-green-500 opacity-80 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-gray-50 hover:shadow-lg"
                      onClick={() => handleOpenTask(task)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium text-gray-600 truncate line-through">
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Completed: {formatDate(task.due_date)}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4 flex flex-row items-center gap-2">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColors[task.status]}`}
                        >
                          {formatStatus(task.status)}
                        </span>
                        {/* Update Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTask(task);
                          }}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-1"
                        >
                          ✎
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(task);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 p-6 border rounded-xl bg-gray-50 flex flex-col items-center">
                    <ClipboardDocumentCheckIcon className="h-10 w-10 mb-2 text-gray-400" />
                    No completed tasks
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for New Task */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transform scale-100 transition-all duration-300 animate-scaleIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Task</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <TaskForm
                onSubmit={(task) => {
                  addTask(task);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
                compact
              />
            </div>
          </div>
        )}

        {/* Modal for Editing Task */}
        {editingTask && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transform scale-100 transition-all duration-300 animate-scaleIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <TaskForm
                initialData={editingTask}
                submitLabel="Update Task"
                onSubmit={(updated) => {
                  updateTask(editingTask.id, updated);
                  setEditingTask(null);
                }}
                onCancel={() => setEditingTask(null)}
                compact
              />
            </div>
          </div>
        )}

        {/* Render TaskDetails modal */}
        {page === "taskDetails" && selectedTask && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl transform scale-100 transition-all duration-300 animate-scaleIn relative">
              {/* Close Button */}
              <button
                onClick={() => setPage("main")}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              {/* TaskDetails now view-only */}
              <TaskDetails task={selectedTask} setPage={setPage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
