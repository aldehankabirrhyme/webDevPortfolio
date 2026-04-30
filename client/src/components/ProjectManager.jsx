import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/api";
import ProjectUpdateModal from "../components/ui/ProjectUpdateModal";

const ProjectManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, fetchDashboardData } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectDescription: "",
    technologies: "",
    image:"",
    src: "",
    codeSrc: "",
  });
  const [formSelected, setFormSelected] = useState({
    title: "",
    description: "",
    projectDescription: "",
    technologies: "",
    src: "",
    image:"",
    codeSrc: "",
  });
  const [projectImage, setProjectImage] = useState(null);

 // Upload image to server and return file URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosClient.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.fileUrl;
  };

  const addProject = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    await axiosClient.post("/api/projects", form);
    fetchDashboardData();
    setForm({
      title: "",
      description: "",
      projectDescription: "",
      technologies: "",
      src: "",
      image: await uploadImage(projectImage),
      codeSrc: "",
    });
  };

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await axiosClient.delete(`/api/projects/${id}`);
      fetchDashboardData();
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>

        {/* Project Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full"
          />
          <input
            placeholder="Short Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full"
          />
        <label>Project Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setProjectImage(e.target.files[0])}
          className="w-full"
        />
          <textarea
            placeholder="Full Description"
            value={form.projectDescription}
            onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:col-span-2"
            rows={3}
          />
          <input
          placeholder="technologies (comma separated, e.g., React, Node.js)"
          value={form.technologies}
          onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          className="border p-3 rounded-lg focus:ring focus:ring-primary w-full dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            placeholder="Project Link"
            value={form.src}
            onChange={(e) => setForm({ ...form, src: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full"
          />
          <input
            placeholder="Source Code Link"
            value={form.codeSrc}
            onChange={(e) => setForm({ ...form, codeSrc: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full"
          />
          <button
            onClick={addProject}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow w-full md:w-auto"
          >
            Add Project
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Short Description</th>
                <th className="px-4 py-3 text-left">Full Description</th>
                <th className="px-4 py-3 text-left">Technologies</th>
                <th className="px-4 py-3 text-left">Project Link</th>
                <th className="px-4 py-3 text-left">Source Code</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.projectsAdmin?.length > 0 ? (
                data.projectsAdmin.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3">{p.description}</td>
                    <td className="px-4 py-3">{p.projectDescription}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {p.technologies.join(", ")}
                  </td>
                    <td className="px-4 py-3 text-blue-600 hover:underline">
                      <a href={p.src} target="_blank" rel="noopener noreferrer">
                        Visit
                      </a>
                    </td>
                    <td className="px-4 py-3 text-blue-600 hover:underline">
                      <a href={p.codeSrc} target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setFormSelected(p);
                          setIsOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Editing Project */}
      {isOpen && (
        <ProjectUpdateModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          formData={formSelected}
          darkMode={false}
        />
      )}
    </>
  );
};

export default ProjectManager;
