import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Save token from URL if exists (OAuth flow)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    // Redirect to dashboard after short delay
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

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
