import React from "react";

export default function TaskDetails({ task, setPage }) {
  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
          <p className="text-gray-600 mb-4">Task not found.</p>
          <button
            onClick={() => setPage("dashboard")}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2">
          {task.title}
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6 italic">
          {task.description || "No description"}
        </p>

        {/* Meta Info */}
        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex justify-between border-t pt-3">
            <span className="font-semibold">Status:</span>
            <span>{task.status}</span>
          </p>
          <p className="flex justify-between border-t pt-3">
            <span className="font-semibold">Due Date:</span>
            <span>
              {task.due_date
                ? new Date(task.due_date).toLocaleDateString("en-GB")
                : "—"}
            </span>
          </p>
          <p className="flex justify-between border-t pt-3">
            <span className="font-semibold">Created At:</span>
            <span>
              {task.created_at
                ? new Date(task.created_at).toLocaleString("en-GB")
                : "—"}
            </span>
          </p>
          <p className="flex justify-between border-t pt-3">
            <span className="font-semibold">Updated At:</span>
            <span>
              {task.updated_at
                ? new Date(task.updated_at).toLocaleString("en-GB")
                : "—"}
            </span>
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setPage("dashboard")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
