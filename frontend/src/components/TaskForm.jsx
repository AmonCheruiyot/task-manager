import { useState, useEffect } from "react";

export default function TaskForm({
  onSubmit,     // Flexible handler (preferred)
  onAdd,        // Legacy/simple handler
  onCancel,
  initialData = null,
  submitLabel,  // Optional override
  compact = false,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "todo");
      setDueDate(initialData.due_date || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDate("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = { title, description, status, due_date: dueDate };

    // Prefer `onSubmit`, fallback to `onAdd`
    if (onSubmit) {
      onSubmit(payload);
    } else if (onAdd) {
      onAdd(payload);
    }

    // Reset only when adding new
    if (!initialData) {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${
        compact
          ? "bg-transparent p-0"
          : "bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      }`}
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        rows={3}
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          {submitLabel || (initialData ? "Save Changes" : "Add Task")}
        </button>
      </div>
    </form>
  );
}
