import { lazy, Suspense } from "react";

// Lazy load TaskDashboard for better code-splitting
const TaskDashboard = lazy(() => import("../components/TaskDashboard"));

// Ensure DashboardPage receives all necessary props from LandingPage
export default function DashboardPage({ setPage, setSelectedTask, tasks, loading, addTask, removeTask, updateTask, page, selectedTask }) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
      <TaskDashboard 
        setPage={setPage} 
        setSelectedTask={setSelectedTask} 
        tasks={tasks}
        loading={loading}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
        page={page}
        selectedTask={selectedTask}
      />
    </Suspense>
  );
}
