import TaskDashboard from "../components/TaskDashboard";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <TaskDashboard />
    </div>
  );
}
