import { useTasks } from "../hooks/useTasks";
import TaskForm from "./TaskForm";

export default function TaskDashboard() {
  const { tasks, loading, addTask, removeTask } = useTasks();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <TaskForm onAdd={addTask} />
      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span>{task.title}</span>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
