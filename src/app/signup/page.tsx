"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  initialSignupSteps,
  profileSetupSteps,
  ThankYouStepComponent,
} from "./signupSteps";
import ProgressBar from "./components/ProgressBar";
import { FormData, CommonStepProps } from "./types";
import StepComingSoon from "./components/StepComingSoon";
import StepContainer from "./components/common/StepContainer";

export default function SignUpPage() {
  const router = useRouter();

  type Flow = "initial" | "verify_wait" | "thankyou" | "profile" | "comingsoon";
  const [flow, setFlow] = useState<Flow>("initial");
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);

  const pollRef = useRef<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    surname: "",
    dob: "",
    gender: "",
    country: "",
    preference: "",
    height: "",
    height_feet: undefined,
    height_inches: undefined,
    religion: "",
    pets: [],
    smoking: "",
    drinking: "",
    kids: "",
    goal: "",
    profilePicture: null,
    gallery: [],
    description: "",
  });

  // Load profile_id from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("profile_id");
    if (savedId) setProfileId(savedId);
  }, []);

  // Poll while waiting for verification
  useEffect(() => {
    if (flow !== "verify_wait" || !profileId) return;

    const poll = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        if (data.email_verified === true) {
          if (pollRef.current) window.clearInterval(pollRef.current);
          // ✅ AFTER verification, show the original Thank You screen
          setFlow("thankyou");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    poll();
    pollRef.current = window.setInterval(poll, 4000);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [flow, profileId]);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (flow === "initial") {
      if (stepIndex < initialSignupSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        // On finishing initial steps → create profile & start verification wait
        handleSubmit(false, true);
      }
    } else if (flow === "thankyou") {
      // User clicks Start on the Thank You screen
      setFlow("profile");
      setStepIndex(0);
    } else if (flow === "profile") {
      if (stepIndex < profileSetupSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (flow === "initial") {
      if (stepIndex > 0) setStepIndex((prev) => prev - 1);
    } else if (flow === "profile") {
      if (stepIndex > 0) setStepIndex((prev) => prev - 1);
      // no back from profile → thankyou per your original behavior
    }
  };

  const buildPayload = () => ({
    email: formData.email || undefined,
    first_name: formData.name || undefined,
    last_name: formData.surname || undefined,
    dob: formData.dob || undefined,
    gender: formData.gender || undefined,
    country: formData.country?.toUpperCase() || undefined,
    preference: formData.preference || undefined,
    height_feet: formData.height_feet ?? undefined,
    height_inches: formData.height_inches ?? undefined,
    religion: formData.religion || undefined,
    pets:
      Array.isArray(formData.pets) && formData.pets.length > 0
        ? formData.pets[0].toLowerCase()
        : undefined,
    smoking: formData.smoking || undefined,
    drinking: formData.drinking || undefined,
    kids: formData.kids === "i_want" ? "i_want_to" : formData.kids || undefined,
    goal: formData.goal || undefined,
    description: formData.description || undefined,
    profile_picture_url: formData.profilePicture || undefined,
    gallery_urls: formData.gallery || undefined,
  });

  const handleSubmit = async (isFinal = false, isInitialCreate = false) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = buildPayload();

      let url = `${process.env.NEXT_PUBLIC_API_URL}/profiles`;
      let method: "POST" | "PATCH" = "POST";

      if (profileId && !isInitialCreate) {
        if (isFinal) {
          url = `${url}/${profileId}/complete`;
          method = "POST";
        } else {
          url = `${url}/${profileId}`;
          method = "PATCH";
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Signup failed");
      }

      const data = await res.json();

      if (isInitialCreate) {
        const newId = data.id;
        setProfileId(newId);
        localStorage.setItem("profile_id", newId);
        // ➜ enter verification waiting screen
        setFlow("verify_wait");
      } else if (isFinal) {
        setFlow("comingsoon");
      }
    } catch (err) {
      setError("Something went wrong during sign up. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const WaitingForVerification = () => (
    <StepContainer>
      <h2>Check your email to verify</h2>
      <p style={{ textAlign: "center", maxWidth: 420, margin: "0.5rem auto" }}>
        We’ve sent you a verification link. Click it to continue.
      </p>
      <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
        <div className="spinner" />
      </div>
    </StepContainer>
  );

  const renderCurrentStep = () => {
    if (flow === "comingsoon") return <StepComingSoon />;
    if (flow === "verify_wait") return <WaitingForVerification />;
    if (flow === "thankyou") return <ThankYouStepComponent nextStep={nextStep} />;

    const currentSteps = flow === "initial" ? initialSignupSteps : profileSetupSteps;
    const currentStepConfig = currentSteps.find((s) => s.id === stepIndex);
    if (!currentStepConfig) return <p>Invalid step!</p>;

    const { component: StepComponent, props: stepProps } = currentStepConfig;
    const commonProps: CommonStepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
      isSubmitting,
      handleSubmit: (isFinal: boolean) => handleSubmit(isFinal),
    };

    if (currentStepConfig.component.name === "OptionStep") {
      return (
        <StepComponent
          {...stepProps}
          selected={formData[stepProps.field as keyof FormData]}
          onSelect={(value: string) => {
            updateFormData({ [stepProps.field]: value });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    }

    return <StepComponent {...commonProps} />;
  };

  const getProgressBarProps = () => {
    if (flow === "initial")
      return { currentStep: stepIndex, totalSteps: initialSignupSteps.length };
    if (flow === "verify_wait" || flow === "thankyou")
      return { currentStep: initialSignupSteps.length, totalSteps: initialSignupSteps.length };
    return { currentStep: stepIndex, totalSteps: profileSetupSteps.length };
  };

  const { currentStep, totalSteps } = getProgressBarProps();

  const getTitle = () => {
    if (flow === "initial" || flow === "verify_wait" || flow === "thankyou") return "Join us";
    return "Create Your Profile";
  };

  return (
    <>
      {flow !== "comingsoon" && (
        <>
          <h1>{getTitle()}</h1>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </>
      )}
      <div className="form-container">
        {renderCurrentStep()}
        {error && (
          <p style={{ color: "#ff5555", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </>
  );
}
