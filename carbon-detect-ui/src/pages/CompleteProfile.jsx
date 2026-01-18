import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import { completeProfile } from "../services/authService";

const roles = [
  { label: "Student", value: "student" },
  { label: "Organizer", value: "organizer" },
  { label: "Institution", value: "institution" },
  { label: "Company", value: "company" },
];

const CompleteProfile = ({ onDone }) => {
  const [role, setRole] = useState(null);
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!role || !org) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      await completeProfile({
        role: role.value,
        organizationName: org,
      });

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
        <h2>Complete Profile</h2>

        <CustomSelect
          options={roles}
          placeholder="Select Role"
          value={role}
          onChange={setRole}
        />

        <input
          placeholder="Organization / Institution"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
        />

        <button className="auth-btn" onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
