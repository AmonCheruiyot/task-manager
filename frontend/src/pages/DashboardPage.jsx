import TaskDashboard from "../components/TaskDashboard";

export default function DashboardPage({ setPage, setSelectedTask }) {
  return (
    <TaskDashboard 
      setPage={setPage} 
      setSelectedTask={setSelectedTask} 
    />
  );
}
