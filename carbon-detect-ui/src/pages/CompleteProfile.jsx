import { useState } from "react";
import { completeProfile } from "../services/authService";

const CompleteProfile = ({ onDone }) => {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      await completeProfile({});

      onDone("Profile Completed 🎉");
    } catch {
      //  DO NOTHING
      // auth errors are handled globally (silent logout)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Profile Setup</h2>
        <p>Your profile is almost ready!</p>

        <button className="auth-btn" onClick={submit} disabled={loading}>
          {loading ? "Setting up..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
