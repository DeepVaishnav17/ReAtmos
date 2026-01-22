// import { useState } from "react";
// import { completeProfile } from "../services/authService";

// const CompleteProfile = ({ onDone }) => {
//   const [loading, setLoading] = useState(false);

//   const submit = async () => {
//     try {
//       setLoading(true);

//       await completeProfile({});

//       onDone("Profile Completed 🎉");
//     } catch {
//       //  DO NOTHING
//       // auth errors are handled globally (silent logout)
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Profile Setup</h2>
//         <p>Your profile is almost ready!</p>

//         <button className="auth-btn" onClick={submit} disabled={loading}>
//           {loading ? "Setting up..." : "Continue"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfile;

import { useState } from "react";
import LocationInput from "../components/LocationInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.put(
      "http://localhost:5000/users/complete-profile",
      { location },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Complete Your Profile</h2>
        <p>We need your city to calculate carbon impact</p>

        <LocationInput
          value={location}
          onSelect={(loc) => setLocation(loc)}
        />

        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default CompleteProfile;
