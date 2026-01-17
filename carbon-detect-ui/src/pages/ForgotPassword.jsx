// import { useState } from "react";

// const ForgotPassword = ({ onBack }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // enter key support

//     if (!email) {
//       setError("Please enter your email");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       //  API CALL COMES NEXT STEP
//       // await forgotPassword({ email });

//       // TEMP success message (UX first)
//       setMessage(
//         "If an account exists, a password reset link has been sent."
//       );
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Forgot Password</h2>
//         <p>We’ll send you a reset link</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//               setMessage("");
//             }}
//           />

//           {error && <div className="auth-error">{error}</div>}
//           {message && <div className="auth-success">{message}</div>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send reset link"}
//           </button>
//         </form>

//         <span onClick={onBack}>← Back to login</span>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { forgotPassword } from "../services/authService";

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ enter key support

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await forgotPassword(email);

      // ✅ SAME MESSAGE ALWAYS (SECURITY)
      setMessage(
        "If an account exists, a password reset link has been sent."
      );
    } catch (err) {
  if (
    err.message.includes("social login")
  ) {
    setError("This account uses Google/GitHub login. Please sign in using that.");
  } else {
    setError("Something went wrong. Please try again.");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>We’ll send you a reset link</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMessage("");
            }}
          />

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <span onClick={onBack}>← Back to login</span>
      </div>
    </div>
  );
};

export default ForgotPassword;
