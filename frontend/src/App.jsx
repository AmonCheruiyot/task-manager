import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setPage={setPage} />
      <main className="flex-1 p-6">
        {page === "home" ? <HomePage /> : <DashboardPage />}
      </main>
    </div>
  );
}

export default App;
