
import { useState } from "react";
import { registerUser } from "../services/authService";
import LocationInput from "../components/LocationInput";

const Register = ({ switchToLogin, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent reload
    //console.log("FORM DATA 👉", form);
    if (!form.name || !form.email || !form.password || !form.location) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        location: form.location,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        onSuccess("Registration successful 🎉");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${loading ? "blurred" : ""}`}>
        <h2>Create Account</h2>
        <p>Start your sustainability journey</p>

        {/*  FORM */}
        <form onSubmit={handleRegister}>
          <input
            placeholder="Full Name"
            value={form.name}
            disabled={loading}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setError("");
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            disabled={loading}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            disabled={loading}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              setError("");
            }}
          />
          {/* LOCATION (CITY ONLY) */}
          <LocationInput
  value={form.location}
  onSelect={(location) =>
  setForm((prev) => ({ ...prev, location: location.trim() }))
}
  onInvalid={() =>
    setError("Please select a city from the dropdown")
  }
  
/>





          {/*  ERROR MESSAGE */}
          {error && <div className="auth-error">{error}</div>}

          {/* SUBMIT */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* OR */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* OAUTH */}
        <div className="oauth-container">
          <button
            type="button"
            className="oauth-btn github"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/github")
            }
          >
            <svg viewBox="0 0 24 24" className="oauth-icon">
              <path
                fill="currentColor"
                d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.77.11 3.06.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56 4.56-1.53 7.84-5.86 7.84-10.97C23.5 5.74 18.27.5 12 .5z"
              />
            </svg>
            Continue with GitHub
          </button>

          <button
            type="button"
            className="oauth-btn google"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google")
            }
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="oauth-icon-img"
            />
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


