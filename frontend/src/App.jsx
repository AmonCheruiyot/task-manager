import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import TaskDetails from "./components/TaskDetails";

function App() {
  const [page, setPage] = useState("home");
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setPage={setPage} />
      <main className="flex-1 p-6">
        {page === "home" && <HomePage />}
        {page === "dashboard" && (
          <DashboardPage
            setPage={setPage}
            setSelectedTask={setSelectedTask}   // ✅ pass this down
          />
        )}
        {page === "taskDetails" && (
          <TaskDetails
            task={selectedTask}
            setPage={setPage}
          />
        )}
      </main>
    </div>
  );
}

export default App;
