
import { useEffect } from "react";

const OAuthSuccess = ({ onCompleteProfile, onSuccess }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const needsProfile = params.get("needsProfile") === "true";

    if (token) {
      localStorage.setItem("token", token);

      setTimeout(() => {
        if (needsProfile) {
          onCompleteProfile();
        } else {
          onSuccess("Login Successful via OAuth ✅");
        }
      }, 800);
    }
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>OAuth Login Successful</h2>
        <p>Redirecting…</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;


