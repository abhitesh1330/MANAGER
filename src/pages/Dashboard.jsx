import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pending = tasks.filter((task) => task.status === "pending").length;
  const progress = tasks.filter((task) => task.status === "in-progress").length;
  const completed = tasks.filter((task) => task.status === "completed").length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="mb-8 text-gray-600">
        Welcome, {user?.name} ({user?.role})
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-4xl font-bold">{tasks.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-4xl font-bold text-yellow-600">{pending}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">In Progress</h2>
          <p className="text-4xl font-bold text-blue-600">{progress}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-4xl font-bold text-green-600">{completed}</p>
        </div>
      </div>
    </div>
  );
}