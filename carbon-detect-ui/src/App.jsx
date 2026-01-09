



import { useState, useMemo, useEffect } from "react";
import Threads from "./components/Threads";
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

  /* 🔥 VERY IMPORTANT: detect OAuth redirect */
  useEffect(() => {
    if (window.location.pathname === "/oauth-success") {
      setPage("oauth-success");
    }
  }, []);

  const threadsBg = useMemo(
    () => (
      <Threads
        amplitude={1}
        distance={0}
        color={[1, 1, 1]}
        enableMouseInteraction={false}
      />
    ),
    []
  );

  return (
    <div className="app-root">
      {threadsBg}

      <ClickSpark sparkColor="#34d399" sparkRadius={18} sparkCount={10} />

      <div className="foreground">
        {/* LOGIN */}
        {page === "login" && (
          <Login
            switchToRegister={() => setPage("register")}
            onSuccess={(msg = "Login Successful ✅") => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {/* REGISTER */}
        {page === "register" && (
          <Register
            switchToLogin={() => setPage("login")}
            onSuccess={(msg = "Registration Successful 🎉") => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {/* OAUTH SUCCESS */}
        {page === "oauth-success" && (
          <OAuthSuccess
            onCompleteProfile={() => setPage("complete-profile")}
            onSuccess={(msg) => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {/* COMPLETE PROFILE */}
        {page === "complete-profile" && (
          <CompleteProfile
            onDone={(msg) => {
              setMessage(msg);
              setPage("success");
            }}
          />
        )}

        {/* FINAL SUCCESS */}
        {page === "success" && <Success message={message} />}
      </div>
    </div>
  );
};

export default App;
