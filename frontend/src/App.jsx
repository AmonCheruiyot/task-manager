import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import TaskDetails from "./components/TaskDetails";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [page, setPage] = useState("home");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setPage={setPage} />
      <main className="flex-1 p-6">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "dashboard" && (
          <DashboardPage
            setPage={setPage}
            setSelectedTask={setSelectedTask}
          />
        )}
        {page === "taskDetails" && (
          <TaskDetails task={selectedTask} setPage={setPage} />
        )}
      </main>
    </div>
  );
}

export default App;
