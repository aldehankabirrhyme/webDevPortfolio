import React, { useEffect, useState } from "react";
import axiosClient from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function ProjectUpdateModal({ isOpen, onClose, formData, darkMode }) {
  const { fetchDashboardData } = useAuth();
  const [projectImage, setProjectImage] = useState(null);
  const [loading, setLoading] = useState(false); // লোডিং স্টেট যোগ করা হয়েছে

  const [form, setForm] = useState({
    _id: "",
    title: "",
    description: "",
    projectDescription: "",
    src: "",
    image: "",
    codeSrc: "",
    isVisible: true, // Visibility অপশন
  });

  // ইমেজ আপলোড ফাংশন
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axiosClient.post("/api/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.fileUrl;
  };

  useEffect(() => {
    if (formData) {
      setForm({
        _id: formData._id || "",
        title: formData.title || "",
        description: formData.description || "",
        projectDescription: formData.projectDescription || "",
        image: formData.image || "",
        src: formData.src || "",
        codeSrc: formData.codeSrc || "",
        isVisible: formData.isVisible ?? true, // ডিফল্ট ট্রু
      });
      setProjectImage(null);
    }
  }, [formData]);

  const updateProject = async () => {
    if (!form.title.trim()) {
      alert("Project title is required.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = form.image;

      if (projectImage) {
        imageUrl = await uploadImage(projectImage);
      }

      await axiosClient.put(`/api/projects/${form._id}`, {
        ...form,
        image: imageUrl,
      });

      await fetchDashboardData();
      onClose();
      setProjectImage(null);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`mt-10 p-6 rounded-2xl max-w-lg w-full shadow-2xl transition-all 
          ${darkMode 
            ? "bg-slate-900 border border-slate-700 text-white" 
            : "bg-white border border-gray-200 text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Project</h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium opacity-80">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2.5 rounded-lg border bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Visibility Control - NEW */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
            <div>
              <p className="text-sm font-semibold">Project Visibility</p>
              <p className="text-xs opacity-60">Should this project be public?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={form.isVisible}
                onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium opacity-80">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProjectImage(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {projectImage ? (
              <p className="text-xs mt-2 text-blue-500 italic">New: {projectImage.name}</p>
            ) : form.image && (
              <img
                src={import.meta.env.VITE_BACKEND_URL + form.image}
                alt="Current"
                className="mt-3 rounded-lg border w-24 h-24 object-cover"
              />
            )}
          </div>

          {/* Descriptions */}
          <div>
            <label className="block mb-1 text-sm font-medium opacity-80">Short Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2.5 rounded-lg border bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium opacity-80">Full Details</label>
            <textarea
              value={form.projectDescription}
              onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
              className="w-full p-2.5 rounded-lg border bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium opacity-80">Live URL</label>
              <input
                type="url"
                value={form.src}
                onChange={(e) => setForm({ ...form, src: e.target.value })}
                className="w-full p-2 rounded-lg border bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium opacity-80">Code URL</label>
              <input
                type="url"
                value={form.codeSrc}
                onChange={(e) => setForm({ ...form, codeSrc: e.target.value })}
                className="w-full p-2 rounded-lg border bg-transparent border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-xs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={updateProject}
              disabled={loading}
              className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-white transition-all 
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"}`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}