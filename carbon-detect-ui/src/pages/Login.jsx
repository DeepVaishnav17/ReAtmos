

import { useState } from "react";
import { loginUser } from "../services/authService";


const Login = ({ switchToRegister, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const res = await loginUser({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      onSuccess();
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <p>Track your carbon footprint</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
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
  onClick={() =>
    (window.location.href = "http://localhost:5000/auth/google")
  }
>
  Continue with Google
</button>


        <span onClick={switchToRegister}>
          Don’t have an account? Register
        </span>
      </div>
    </div>
  );
};

export default Login;
