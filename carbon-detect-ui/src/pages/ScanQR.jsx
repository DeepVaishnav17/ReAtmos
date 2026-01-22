import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { authFetch } from "../services/authFetch";

export default function ScanQR() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      alert("Invalid QR");
      return;
    }

    const verify = async () => {
      try {
         console.log("API URL 👉", import.meta.env.VITE_API_URL);
    console.log("Calling 👉", `${import.meta.env.VITE_API_URL}/api/events/verify/${token}`);
        const res = await authFetch(`/api/events/verify/${token}`);
        const msg = await res.text();
        alert(msg);
      } catch (err) {
        alert("Error verifying QR");
      }
    };

    verify();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Verifying Attendance...</h2>
      <p>Please wait...</p>
    </div>
  );
}
