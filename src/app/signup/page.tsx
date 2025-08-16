"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveProgress, loadProgress, clearProgress } from "@/lib/progress";

import {
  initialSignupSteps,
  profileSetupSteps,
  ThankYouStepComponent,
} from "./signupSteps";
import { startProfile, patchProfile, completeProfile } from "@/lib/api";
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
  const saveTimer = useRef<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    surname: "",
    dob: "",
    gender: "",
    country: "",
    preference: "",
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

  const canPersist = Boolean(profileId);

  // --- Bootstrap: load saved id & form, then validate the id against backend
  useEffect(() => {
    const savedId = localStorage.getItem("profile_id");
    const saved = loadProgress();

    if (saved?.formData) {
      setFormData((prev) => ({ ...prev, ...saved.formData }));
    }

    if (!savedId) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${savedId}`);
        if (!res.ok) {
          // If the profile is gone (e.g., DB wiped), clean up client state.
          localStorage.removeItem("profile_id");
          clearProgress();
          if (res.status === 404) {
            setProfileId(null);
            setFlow("initial");
          }
          return;
        }

        const profile = await res.json();
        if (cancelled) return;

        setProfileId(savedId);

        if (!profile.email_verified) {
          setFlow("verify_wait");
          return;
        }

        // verified → restore saved step in profile flow if present
        if (saved?.profile_id === savedId && saved.flow === "profile") {
          setFlow("profile");
          setStepIndex(Math.min(saved.stepIndex ?? 0, profileSetupSteps.length - 1));
        } else {
          setFlow("thankyou");
        }
      } catch {
        // Network/CORS/etc: don’t crash the app; user can just start again
        // (if you want, you could show a toast here)
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // --- Poll backend while waiting for verification
  useEffect(() => {
    if (flow !== "verify_wait" || !profileId) return;

    const poll = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`);
        if (res.status === 404) {
          // Profile disappeared → reset
          if (pollRef.current) window.clearInterval(pollRef.current);
          localStorage.removeItem("profile_id");
          clearProgress();
          setProfileId(null);
          setFlow("initial");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        if (data.email_verified === true) {
          if (pollRef.current) window.clearInterval(pollRef.current);
          setFlow("thankyou");
        }
      } catch (err) {
        // soft-fail; try again next tick
        // console.error("Polling error:", err);
      }
    };

    poll();
    pollRef.current = window.setInterval(poll, 4000);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [flow, profileId]);

  // --- Debounced persistence (only after we have a profile id)
  useEffect(() => {
    if (!canPersist) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);

    saveTimer.current = window.setTimeout(() => {
      saveProgress({
        profile_id: profileId!,
        flow:
          flow === "profile"
            ? "profile"
            : flow === "thankyou"
            ? "thankyou"
            : "verify_wait",
        stepIndex,
        formData,
        savedAt: Date.now(),
      });
    }, 300);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [formData, stepIndex, flow, canPersist, profileId]);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (flow === "initial") {
      if (stepIndex < initialSignupSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        // finishing initial → create profile and begin verification wait
        handleSubmit(false, true);
      }
    } else if (flow === "thankyou") {
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
    }
  };

  const buildPayload = () => {
    const payload: Record<string, any> = {};
    // A helper to safely add properties if they exist
    const add = (key: string, value: any) => {
      if (value !== "" && value !== undefined && value !== null) {
        payload[key] = value;
      }
    };

    add("email", formData.email);
    add("first_name", formData.name);
    add("last_name", formData.surname);
    add("dob", formData.dob);
    add("gender", formData.gender);
    add("country", formData.country?.toUpperCase());
    add("preference", formData.preference);
    add("height_feet", formData.height_feet);
    add("height_inches", formData.height_inches);
    add("religion", formData.religion);
    // Note: The backend seems to only support a single pet.
    add(
      "pets",
      Array.isArray(formData.pets) && formData.pets.length > 0
        ? formData.pets[0].toLowerCase()
        : undefined
    );
    add("smoking", formData.smoking);
    add("drinking", formData.drinking);
    add("kids", formData.kids);
    add("goal", formData.goal);
    add("description", formData.description);
    add("profile_picture_url", formData.profilePicture);
    add("gallery_urls", formData.gallery);

    return payload;
  };

  const handleSubmit = async (isFinal = false, isInitialCreate = false) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isInitialCreate) {
        const { id } = await startProfile({
          first_name: formData.name,
          last_name: formData.surname,
          dob: formData.dob,
          email: formData.email,
        });
        setProfileId(id);
        localStorage.setItem("profile_id", id);
        saveProgress({
          profile_id: id,
          flow: "verify_wait",
          stepIndex,
          formData,
          savedAt: Date.now(),
        });
        setFlow("verify_wait");
      } else if (profileId) {
        if (isFinal) {
          await completeProfile(profileId);
          clearProgress();
          localStorage.removeItem("profile_id");
          setFlow("comingsoon");
        } else {
          await patchProfile(buildPayload());
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
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
      <p style={{ fontSize: 14 }}>
        Didn’t get it? Check spam or{" "}
        <span
          className="link-accent"
          onClick={() => {
            // TODO: call a /profiles/{id}/resend endpoint once you add it.
            router.refresh();
          }}
          style={{ cursor: "pointer" }}
        >
          resend
        </span>
        .
      </p>
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
