import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    project: ""
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", form);
      alert("Task created");
      navigate("/tasks");
    } catch (error) {
      alert(error.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-8">
      <form
        onSubmit={createTask}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-6">Create Task</h1>

        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Create Task
        </button>
      </form>
    </div>
  );
}