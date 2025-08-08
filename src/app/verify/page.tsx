"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified ✅. You may now go back to signup screen");
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
    <div style={{ maxWidth: 500, margin: "100px auto", textAlign: "center" }}>  
      {status === "loading" && <h2>Verifying your email…</h2>}
      {status === "success" && (
        <>
          <h2 style={{ color: "green" }}>Success 🎉</h2>
          <p>{message}</p>
        </>
      )}
      {status === "error" && (
        <>
          <h2 style={{ color: "red" }}>Error</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}
