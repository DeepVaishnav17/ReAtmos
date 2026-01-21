import { authFetch } from "./authFetch";

const API_URL = import.meta.env.VITE_API_URL;

/* REGISTER */
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

/* LOGIN */
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

/* COMPLETE PROFILE ( PROTECTED) */
export const completeProfile = async (data) => {
  const res = await authFetch("/api/auth/complete-profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  //  VERY IMPORTANT
  if (!res) return;

  return res.json();
};

/* FORGOT PASSWORD */
export const forgotPassword = async (email) => {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

/* LOGOUT */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
