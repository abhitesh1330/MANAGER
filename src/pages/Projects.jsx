import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      alert("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", form);
      alert("Project created");
      setForm({ title: "", description: "" });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {user?.role === "admin" && (
        <form
          onSubmit={createProject}
          className="bg-white p-6 rounded-xl shadow mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Create Project</h2>

          <input
            type="text"
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border p-3 rounded mb-4"
          />

          <button className="bg-blue-600 text-white px-5 py-2 rounded">
            Add Project
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>

            <p className="text-sm mt-4">
              Created By: {project.createdBy?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}