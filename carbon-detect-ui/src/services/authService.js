
// const API_URL = import.meta.env.VITE_API_URL;

// /* REGISTER */
// export const registerUser = async (data) => {
//   const res = await fetch(`${API_URL}/api/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// /* LOGIN */
// export const loginUser = async (data) => {
//   const res = await fetch(`${API_URL}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// /* COMPLETE PROFILE (OAuth users) */
// export const completeProfile = async (data) => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API_URL}/api/profile/complete-profile`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// };

// /* Forgot */
// export const forgotPassword = async (email) => {
//   const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email }),
//   });

//   return res.json();
// };



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

/* COMPLETE PROFILE */
export const completeProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/auth/complete-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

/* FORGOT PASSWORD */
export const forgotPassword = async (email) => {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};
