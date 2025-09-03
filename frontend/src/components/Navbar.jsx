export default function Navbar({ setPage }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => setPage("home")}>
        Task Manager
      </h1>
      <div className="space-x-4">
        <button onClick={() => setPage("home")} className="hover:underline">
          Home
        </button>
        <button onClick={() => setPage("dashboard")} className="hover:underline">
          Dashboard
        </button>
      </div>
    </nav>
  );
}
