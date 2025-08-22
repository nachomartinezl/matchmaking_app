"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<React.ReactNode>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}`
        );
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(
            <p>
              Your email has been verified.
              <br />
              You may now go back to the <b>signup screen.</b>
            </p>
          );
        } else {
          setStatus("error");
          setMessage(data.detail || "Verification failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    }

    verify();
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // Vertical centering
        justifyContent: "center", // Horizontal centering
        minHeight: "100vh", // Take up the full screen height
        padding: "1rem", // Add some padding for smaller screens
      }}
    >
      {/* Now, use the .form-container class from globals.css for the card itself */}
      <div className="form-container">
        {status === "loading" && (
          <>
            <h2>Verifying your email…</h2>
            <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
              <div className="spinner" />
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <h2 style={{ color: "white" }}>Success! 🎉</h2>
            {message}
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#ff5555" }}>Verification Error</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );  
}
