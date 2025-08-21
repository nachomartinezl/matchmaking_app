"use client";

import { useState } from "react";
import StepContainer from "./common/StepContainer";

interface StepProps {
  formData: {
    name: string; // first name (from earlier step)
    surname: string; // last name  (from earlier step)
    dob: string; // YYYY-MM-DD (from earlier step)
    email: string; // this step
  };
  updateFormData: (data: Partial<StepProps["formData"]>) => void;
  nextStep: () => void; // goes to Thank You (then to profile steps)
}

export default function Step0_Credentials({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
  const canProceed =
    !!formData.name &&
    !!formData.surname &&
    isIsoDate(formData.dob) && // <- add this
    isEmailValid(formData.email);

  const handleNext = async () => {
    setErr(null);
    if (loading) return;

    const cleaned = {
      first_name: formData.name?.trim() || "",
      last_name: formData.surname?.trim() || "",
      dob: formData.dob?.trim() || "",
      email: formData.email?.trim() || "",
    };

    if (
      !cleaned.first_name ||
      !cleaned.last_name ||
      !isIsoDate(cleaned.dob) ||
      !isEmailValid(cleaned.email)
    ) {
      setErr(
        "Please complete all fields with valid values (DOB must be YYYY-MM-DD)."
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: formData.name,
        last_name: formData.surname,
        dob: formData.dob, // "YYYY-MM-DD"
        email: formData.email.trim(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned), // <= use cleaned
      });

      if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
          const data = await res.json();
          if (Array.isArray(data?.detail)) {
            message = data.detail
              .map((e: any) => `${(e.loc ?? []).join(".")}: ${e.msg}`)
              .join(" | ");
          } else if (typeof data?.detail === "string") {
            message = data.detail;
          }
        } catch {}
        throw new Error(message);
      }

      const { id } = await res.json(); // { id: UUID }
      localStorage.setItem("profile_id", id);
      localStorage.setItem("email", payload.email);

      // Move to Thank You (then your flow swaps to profile steps)
      nextStep();
    } catch (e: any) {
      setErr(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canProceed && !loading) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <StepContainer>
      <h2>What's your email?</h2>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value.trimStart() })}
        onKeyDown={onKeyDown}
        required
      />

      {err && <p style={{ color: "red", marginTop: 8 }}>{err}</p>}

      <div className="button-group" style={{ justifyContent: "flex-end" }}>
        <button
          onClick={handleNext}
          className="button-primary"
          disabled={!canProceed || loading}
        >
          {loading ? "Sending…" : "Next"}
        </button>
      </div>
    </StepContainer>
  );
}
