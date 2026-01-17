import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import OAuthSuccess from "./pages/OAuthSuccess";
import CompleteProfile from "./pages/CompleteProfile";
import ClickSpark from "./components/ClickSpark";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");

  //  Detect OAuth redirect
  useEffect(() => {
    if (window.location.pathname === "/oauth-success") {
      setPage("oauth-success");
    }
  }, []);

  return (
    <div className="app-root">
      {/* Background */}
      <div className="bg-image" />

      {/* Blur overlay */}
      <div className="bg-overlay" />

      <ClickSpark sparkColor="#34d399" sparkRadius={18} sparkCount={10} />

      <div className="foreground">
        {page === "login" && (
          <Login
            switchToRegister={() => setPage("register")}
            onSuccess={(msg = "Login Successful ✅") => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {page === "register" && (
          <Register
            switchToLogin={() => setPage("login")}
            onSuccess={(msg = "Registration Successful 🎉") => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {page === "oauth-success" && (
          <OAuthSuccess
            onCompleteProfile={() => setPage("complete-profile")}
            onSuccess={(msg) => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {page === "complete-profile" && (
          <CompleteProfile
            onDone={(msg) => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {page === "success" && <Success message={message} />}
      </div>
    </div>
  );
};

export default App;
