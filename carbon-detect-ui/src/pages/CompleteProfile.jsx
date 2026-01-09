import { useState } from "react";
import CustomSelect from "../components/CustomSelect";

const roles = [
  { label: "Student", value: "student" },
  { label: "Organizer", value: "organizer" },
  { label: "Institution", value: "institution" },
  { label: "Company", value: "company" },
];

const CompleteProfile = ({ onDone }) => {
  const [role, setRole] = useState(null);
  const [org, setOrg] = useState("");

  const submit = async () => {
    if (!role || !org) {
      alert("All fields required");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/profile/complete-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          role: role.value,
          organizationName: org,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      onDone("Profile Completed 🎉");
    } else {
      alert(data.message);
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
          onChange={(e) => setOrg(e.target.value)}
        />

        <button className="auth-btn" onClick={submit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
