import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import OAuthSuccess from "./pages/OAuthSuccess";
import CompleteProfile from "./pages/CompleteProfile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";


import ClickSpark from "./components/ClickSpark";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");
  const location = useLocation();

  // OAuth redirect detection
  useEffect(() => {
    if (location.pathname === "/oauth-success") {
      setPage("oauth-success");
    }
  }, [location.pathname]);

  return (
    <div className="app-root">
      {/* Background */}
      <div className="bg-image" />
      <div className="bg-overlay" />

      <ClickSpark sparkColor="#34d399" sparkRadius={18} sparkCount={10} />

      <div className="foreground">
        <Routes>
          {/*  RESET PASSWORD (URL BASED) */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/*  EXISTING FLOW */}
          <Route
            path="*"
            element={
              <>
                {/* {page === "login" && (
                  <Login
                    switchToRegister={() => setPage("register")}
                    onSuccess={(msg = "Login Successful ✅") => {
                      setMessage(msg);
                      setPage("success");
                    }}
                  />
                )} */}
                {page === "login" && (
                <Login
                  switchToRegister={() => setPage("register")}
                  switchToForgotPassword={() => setPage("forgot-password")}
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

                {page === "forgot-password" && (
                  <ForgotPassword onBack={() => setPage("login")} />
                )}



                {/* {page === "oauth-success" && (
                  <OAuthSuccess
                    onCompleteProfile={() => setPage("complete-profile")}
                    onSuccess={(msg) => {
                      setMessage(msg);
                      setPage("success");
                    }}
                  />
                )} */}
                {page === "oauth-success" &&
  (localStorage.getItem("token") ? (
    <OAuthSuccess
      onCompleteProfile={() => setPage("complete-profile")}
      onSuccess={(msg) => {
        setMessage(msg);
        setPage("success");
      }}
    />
  ) : (
    setPage("login")
  ))}


                {/* {page === "complete-profile" && (
                  <CompleteProfile
                    onDone={(msg) => {
                      setMessage(msg);
                      setPage("success");
                    }}
                  />
                )} */}
                {page === "complete-profile" &&
  (localStorage.getItem("token") ? (
    <CompleteProfile
      onDone={(msg) => {
        setMessage(msg);
        setPage("success");
      }}
    />
  ) : (
    setPage("login")
  ))}


                {page === "success" && <Success message={message} />}
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
