
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "#07040d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#2dd4bf",
        fontSize: "28px",
        fontWeight: "600",
      }}
    >
      Login successful 🚀
    </div>
  );
};

export default Success;
