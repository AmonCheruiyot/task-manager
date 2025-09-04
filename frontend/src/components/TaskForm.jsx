import { useState, useEffect } from "react";

export default function TaskForm({
  onSubmit,
  onCancel,
  initialData = {},
  submitLabel = "Add Task",
  compact = false,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "todo");
      setDueDate(initialData.due_date || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      status,
      due_date: dueDate,
    });

    // Reset only if adding (not editing)
    if (!initialData.id) {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-4 rounded shadow flex flex-col gap-4 ${
        compact ? "p-2" : "p-4"
      }`}
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2"
        rows={3}
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2"
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
        className="border rounded px-3 py-2"
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
