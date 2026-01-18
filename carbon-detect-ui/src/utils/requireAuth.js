export const requireAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
