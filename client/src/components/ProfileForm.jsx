import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/api";

const ProfileForm = () => {
  const { data, fetchDashboardData } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    addressDetails: "",
    bioDetails: "",
    profileImageSrc: "",
    aboutMeCoverImage: "",
    fbLink: "",
    githubLink: "",
    linkedinLink: "",
    resumelink: "",
    formendpoint: "",
    aboutME: {
      Starting: "",
      ProfessionalMilestone: "",
      Today: "",
    },
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  useEffect(() => {
    if (data?.user) {
      setFormData({
        ...data.user,
        aboutME: {
          Starting: data.user?.aboutME?.Starting || "",
          ProfessionalMilestone: data.user?.aboutME?.ProfessionalMilestone || "",
          Today: data.user?.aboutME?.Today || "",
        },
      });
    }
  }, [data]);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested AboutMe
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      aboutME: {
        ...prev.aboutME,
        [name]: value,
      },
    }));
  };

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

  // Handle form save
  const handleSave = async () => {
    try {
      let updatedData = { ...formData };

      // Upload profile image if selected
      if (profileImageFile) {
        const profileImageUrl = await uploadImage(profileImageFile);
        updatedData.profileImageSrc = profileImageUrl;
      }

      // Upload cover image if selected
      if (coverImageFile) {
        const coverImageUrl = await uploadImage(coverImageFile);
        updatedData.aboutMeCoverImage = coverImageUrl;
      }

      // Update profile data
      await axiosClient.put("/api/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchDashboardData();
      alert("Profile updated successfully!");
    } catch (error) {
      if(import.meta.env.VITE_NODE_ENV === 'development') {
        console.error("Error updating profile:", error.response?.data || error.message);
      }
      alert("Failed to update profile.");
    }
  };
 

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Phone */}
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* LinkedIn */}
      <input
        name="linkedinLink"
        placeholder="LinkedIn Profile URL"
        value={formData.linkedinLink}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* GitHub */}
      <input
        name="githubLink"
        placeholder="GitHub Profile URL"
        value={formData.githubLink}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Resume */}
      <input
        name="resumelink"
        placeholder="Resume Link"
        value={formData.resumelink}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Facebook */}
      <input
        name="fbLink"
        placeholder="Facebook Profile URL"
        value={formData.fbLink}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      {/* Form Endpoint */}
      <input
        name="formendpoint"
        placeholder="form endpoint URL"
        value={formData.formendpoint}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      {/* Profession */}
      <input
        name="profession"
        placeholder="Profession"
        value={formData.profession}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Address */}
      <input
        name="addressDetails"
        placeholder="Address"
        value={formData.addressDetails}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Bio */}
      <textarea
        name="bioDetails"
        placeholder="Bio Details"
        value={formData.bioDetails}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        rows={3}
      />

      {/* Profile Image Upload */}
      <div className="space-y-2">
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImageFile(e.target.files[0])}
          className="w-full"
        />
        {formData.profileImageSrc && (
          <img
            src={import.meta.env.VITE_BACKEND_URL+formData.profileImageSrc}
            alt="Profile Preview"
            className="h-20 w-20 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImageFile(e.target.files[0])}
          className="w-full"
        />
        {formData.aboutMeCoverImage && (
          <img
            src={import.meta.env.VITE_BACKEND_URL+formData.aboutMeCoverImage}
            alt="Cover Preview"
            className="h-32 w-full object-cover border rounded"
          />
        )}
      </div>

      {/* About Me Section */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
        <h3 className="text-lg font-semibold">About Me</h3>
        <textarea
          name="Starting"
          placeholder="Starting Journey"
          value={formData.aboutME.Starting}
          onChange={handleAboutChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <textarea
          name="ProfessionalMilestone"
          placeholder="Professional Milestone"
          value={formData.aboutME.ProfessionalMilestone}
          onChange={handleAboutChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <textarea
          name="Today"
          placeholder="Where You Are Today"
          value={formData.aboutME.Today}
          onChange={handleAboutChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full mt-4 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileForm;
