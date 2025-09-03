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
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2">
          {task.title}
        </h1>
        <p className="text-gray-700 mb-6 italic">
          {task.description || "No description"}
        </p>
        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex justify-between items-center border-t pt-3">
            <span className="font-semibold text-gray-800">Status:</span>
            <span
              className={`font-medium px-3 py-1 rounded-full text-white ${
                task.status === "Completed"
                  ? "bg-green-500"
                  : task.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {task.status}
            </span>
          </p>
          <p className="flex justify-between items-center border-t pt-3">
            <span className="font-semibold text-gray-800">Due Date:</span>
            <span>{task.due_date || "—"}</span>
          </p>
          <p className="flex justify-between items-center border-t pt-3">
            <span className="font-semibold text-gray-800">Created At:</span>
            <span>
              {task.created_at
                ? new Date(task.created_at).toLocaleString()
                : "—"}
            </span>
          </p>
          <p className="flex justify-between items-center border-t pt-3">
            <span className="font-semibold text-gray-800">Updated At:</span>
            <span>
              {task.updated_at
                ? new Date(task.updated_at).toLocaleString()
                : "—"}
            </span>
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage("dashboard")}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
