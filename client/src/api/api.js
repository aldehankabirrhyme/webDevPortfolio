import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ১০ সেকেন্ড পর রিকোয়েস্ট টাইমআউট হবে (প্রোডাকশনে জরুরি)
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (প্রোডাকশনে এটি খুব জরুরি)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি টোকেন এক্সপায়ার হয়ে যায় (401 Error)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // ইউজারকে লগইন পেজে পাঠিয়ে দেওয়া ভালো
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

/**
 * Password Update Function
 * এখানে আলাদা করে টোকেন পাঠানোর দরকার নেই, ইন্টারসেপ্টর এটি হ্যান্ডেল করবে।
 */
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosClient.put("/api/auth/update-password", {
      currentPassword,
      newPassword,
    });
    return response.data; // সরাসরি ডাটা রিটার্ন করা প্রোডাকশনে কোড ক্লিন রাখে
  } catch (error) {
    // এররটি থ্রো করা যাতে কম্পোনেন্ট লেভেলে হ্যান্ডেল করা যায়
    throw error.response?.data?.message || "Password update failed";
  }
};

export default axiosClient;