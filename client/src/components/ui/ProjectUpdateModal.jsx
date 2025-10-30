import React, { useEffect, useState } from "react";
import axiosClient from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function ProjectUpdateModal({ isOpen, onClose, formData, darkMode }) {
  const { fetchDashboardData } = useAuth();
  const [projectImage, setProjectImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectDescription: "",
    src: "",
    image: "",
    codeSrc: "",
    technologies: "",
  });

  // Upload image to server and return file URL
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axiosClient.post("/api/upload", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.fileUrl;
  };

  // Set form data when modal opens
  useEffect(() => {
    if (formData) {
      setForm({
        _id: formData._id || "",
        title: formData.title || "",
        description: formData.description || "",
        projectDescription: formData.projectDescription || "",
        image: formData.image || "", // পুরনো src রাখবে, upload করবে না
        src: formData.src || "",
        codeSrc: formData.codeSrc || "",
      });
      setProjectImage(null); // modal খোলার সময় image reset হবে
      // setProjectImage(formData.image); // modal খোলার সময় image reset হবে
    }
  }, [formData]);

  // Update Project API call
  const updateProject = async () => {
    if (!form.title.trim()) {
      alert("Project title is required.");
      return;
    }

    try {
      let imageUrl = form.image; // default: আগের image url

      // যদি নতুন image select করা হয় তাহলে upload করবে
      if (projectImage) {
        imageUrl = await uploadImage(projectImage);
      }

      await axiosClient.put(`/api/projects/${form._id}`, {
        ...form,
        image: imageUrl,
      });

      fetchDashboardData();
      onClose();
      setForm({ title: "", description: "", projectDescription: "", src: "",image:"", codeSrc: "" });
      setProjectImage(null);

    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`mt-4 p-6 rounded-xl max-w-lg w-full shadow-lg transition-transform transform duration-300 
          ${darkMode 
            ? "bg-slate-800 border border-purple-500/20 text-white" 
            : "bg-white border border-gray-200 text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Update Project Information</h2>

        <div className="">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              value={form.title}
              onChange={(e) => {setForm({ ...form, title: e.target.value })
            }}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Project Image */}
          {/* Project Image */}
<div>
  <label className="block mb-1 text-sm font-medium">Project Image</label>
  <input
    name="image"
    type="file"
    accept="image/*"
    onChange={(e) => {
      setProjectImage(e.target.files[0]);
    }}
    className="w-full"
  />

  {/* Optional: show old image or preview new one */}
  {projectImage ? (
    <p className="text-sm mt-1 text-green-500">New image selected: {projectImage.name}</p>
  ) : form.image ? (
    <img
      src={import.meta.env.VITE_BACKEND_URL + form.image}
      alt="Current Project"
      className="mt-2 rounded-md border w-32 h-32 object-cover"
    />
  ) : null}
</div>


          {/* Short Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Short Description</label>
            <textarea
              placeholder="Enter short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full focus:ring focus:ring-indigo-300"
              rows={2}
            />
          </div>

          {/* Full Project Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Full Description</label>
            <textarea
              placeholder="Enter full project details"
              value={form.projectDescription}
              onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full focus:ring focus:ring-indigo-300"
              rows={3}
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block mb-1 text-sm font-medium">Project Link</label>
            <input
              type="url"
              placeholder="https://your-project-link.com"
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Source Code Link */}
          <div>
            <label className="block mb-1 text-sm font-medium">Source Code Link</label>
            <input
              type="url"
              placeholder="https://github.com/your-repo"
              value={form.codeSrc}
              onChange={(e) => setForm({ ...form, codeSrc: e.target.value })}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={updateProject}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition duration-200"
          >
            Update Project
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`mt-4 w-full px-4 py-2 rounded font-medium transition duration-200
            ${darkMode 
              ? "bg-purple-600 hover:bg-purple-700 text-red" 
              : "bg-gray-300 hover:bg-gray-400 text-gray-900"}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
