
const API_URL = import.meta.env.VITE_API_URL;

export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    //  Silent logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");

    localStorage.setItem("authExpired", "true");

    window.location.replace("/login");

    //  THIS IS THE KEY
    return null;
  }

  return res;
};
