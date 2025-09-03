import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "./TaskForm";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { PlusCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Helper function to capitalize status for display
const formatStatus = (status) => status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

export default function TaskDashboard({ setPage, setSelectedTask }) {
  const { tasks, loading, addTask, removeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-100 transition-all duration-300 transform"
          >
            <PlusCircleIcon className="h-5 w-5" />
            New Task
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Filters & Analytics) */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Tasks</h3>
              <div className="flex flex-col gap-4">
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

          {/* Right Column (Task Lists) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* To-Do Section */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">To-Do</h2>
              <div className="space-y-4">
                {todoTasks.length > 0 ? (
                  todoTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-5 bg-white rounded-2xl shadow-md border-l-4 border-blue-500 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-lg"
                      onClick={() => handleOpenTask(task)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-800 truncate">{task.title}</p>
                        <p className="text-sm text-gray-500 mt-1">Due: {task.due_date || "—"}</p>
                      </div>
                      <div className="flex-shrink-0 ml-4 flex flex-col items-end gap-2 text-right">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            statusColors[task.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {formatStatus(task.status)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTask(task.id);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                          aria-label={`Delete task: ${task.title}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 p-4 border rounded-xl bg-gray-50">No tasks found</div>
                )}
              </div>
            </div>

            {/* Completed Section */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-green-700 border-b border-gray-200 pb-2">Completed</h2>
              <div className="space-y-4">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-5 bg-white rounded-2xl shadow-md border-l-4 border-green-500 opacity-70 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-lg"
                      onClick={() => handleOpenTask(task)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium text-gray-600 truncate line-through">{task.title}</p>
                        <p className="text-sm text-gray-400 mt-1">Completed: {task.due_date || "—"}</p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            statusColors[task.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {formatStatus(task.status)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 p-4 border rounded-xl bg-gray-50">No completed tasks</div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Popup for New Task */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg scale-100 transition-transform duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Task</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskForm
                onAdd={(task) => {
                  addTask(task);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
                compact
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
