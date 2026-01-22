import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { authFetch } from "../services/authFetch";

export default function ScanQR() {
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        try {
          // ✅ Extract token from URL
          const url = new URL(decodedText);
          const token = url.searchParams.get("token");

          if (!token) {
            alert("Invalid QR");
            return;
          }

          // ✅ Call backend to verify
          const res = await authFetch(
            `/api/events/verify/${token}`
          );

          const msg = await res.text();
          alert(msg);
        } catch (err) {
          alert("Error verifying QR");
        }
      }
    );

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Scan Participant QR</h2>
      <div id="reader" style={{ width: "300px", margin: "auto" }} />
    </div>
  );
}
