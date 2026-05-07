import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-bold">
        Task Manager
      </Link>

      <div className="flex gap-5 items-center">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-300">
              Dashboard
            </Link>

            <Link to="/projects" className="hover:text-blue-300">
              Projects
            </Link>

            <Link to="/tasks" className="hover:text-blue-300">
              Tasks
            </Link>

            <Link to="/create-task" className="hover:text-blue-300">
              Create Task
            </Link>

            <span className="text-sm bg-blue-600 px-3 py-1 rounded">
              {user?.role}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}