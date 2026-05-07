import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}/status`, { status });
      fetchTasks();
    } catch (error) {
      alert("Status update failed");
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">All Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">{task.title}</h2>

            <p className="text-gray-600 mt-2">{task.description}</p>

            <p className="mt-3">
              Project:{" "}
              <span className="font-semibold">
                {task.project?.title || "No Project"}
              </span>
            </p>

            <p>
              Assigned To:{" "}
              <span className="font-semibold">
                {task.assignedTo?.name || "Not Assigned"}
              </span>
            </p>

            <p>
              Due Date:{" "}
              <span className="font-semibold">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No date"}
              </span>
            </p>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              className="w-full border p-2 rounded mt-4"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={() => deleteTask(task._id)}
              className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}