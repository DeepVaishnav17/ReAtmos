
import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import { registerUser } from "../services/authService";

const roles = [
  { label: "Student", value: "student" },
  { label: "Organizer", value: "organizer" },
  { label: "Institution", value: "institution" },
  { label: "Company", value: "company" },
];

const Register = ({ switchToLogin, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
    organizationName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role.value,
        organizationName: form.organizationName,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        onSuccess("Registration successful 🎉");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${loading ? "blurred" : ""}`}>
        <h2>Create Account</h2>
        <p>Start your sustainability journey</p>

        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <CustomSelect
          options={roles}
          placeholder="Select Role"
          value={form.role}
          onChange={(role) => setForm({ ...form, role })}
        />

        {form.role?.value === "student" && (
          <input
            placeholder="College Name"
            onChange={(e) =>
              setForm({ ...form, organizationName: e.target.value })
            }
          />
        )}

        {["organizer", "institution", "company"].includes(
          form.role?.value
        ) && (
          <input
            placeholder="Organization / Institution Name"
            onChange={(e) =>
              setForm({ ...form, organizationName: e.target.value })
            }
          />
        )}

        <button
          className="auth-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* 🔐 OAuth Buttons */}
        <div style={{ marginTop: "14px" }}>
          <button
            className="auth-btn"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/github")
            }
          >
            Continue with GitHub
          </button>

          <button
            className="auth-btn"
            style={{ marginTop: "8px" }}
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google")
            }
          >
            Continue with Google
          </button>
        </div>

        <span onClick={switchToLogin}>
          Already have an account? Login
        </span>
      </div>

      {loading && <div className="loader-overlay">Creating account…</div>}
    </div>
  );
};

export default Register;
