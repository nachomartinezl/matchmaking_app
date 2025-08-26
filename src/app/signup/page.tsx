"use client";

import { useState, useEffect, useRef } from "react";
import {
  startProfile,
  patchProfile,
  completeProfile,
  getProfile,
} from "@/lib/api";
import { ApiError } from "@/lib/errors";

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
  type Flow = "initial" | "verify_wait" | "thankyou" | "profile" | "comingsoon";
  const [flow, setFlow] = useState<Flow>("initial");
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string | undefined>>
  >({});
  const [profileId, setProfileId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    surname: "",
    dob: "",
    gender: undefined,
    country: "",
    preference: undefined,
    height_feet: undefined,
    height_inches: undefined,
    religion: undefined,
    pets: [],
    smoking: undefined,
    drinking: undefined,
    kids: undefined,
    goal: undefined,
    profilePicture: null,
    gallery: [],
    description: "",
  });

  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    // On mount, check if a profile ID was saved (e.g., user refreshed on verification page)
    const savedId = localStorage.getItem("profile_id");
    if (savedId) {
      setProfileId(savedId);
    }
  }, []);

  useEffect(() => {
    if (flow !== "verify_wait" || !profileId) return;
    const poll = async () => {
      try {
        const profile = await getProfile(profileId);
        if (profile?.email_verified === true) {
          if (pollRef.current) window.clearInterval(pollRef.current);
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
    if (Object.keys(newData).length > 0) {
      const field = Object.keys(newData)[0] as keyof FormData;
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    const currentFlowSteps =
      flow === "initial" ? initialSignupSteps : profileSetupSteps;
    if (stepIndex < currentFlowSteps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      // It's the last step of the current flow, trigger the appropriate submission
      if (flow === "initial") {
        handleSubmit(false, true);
      } else if (flow === "profile") {
        handleSubmit(true, false);
      }
    }
  };

  const prevStep = () => {
    if ((flow === "initial" || flow === "profile") && stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const buildProfilePatchPayload = () => {
    const payload: Record<string, unknown> = {};
    for (const key in formData) {
      const value = formData[key as keyof FormData];
      // Exclude file objects from this final patch
      if (
        key !== "profilePicture" &&
        key !== "gallery" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      ) {
        payload[key] = value;
      }
    }
    if (payload.country) payload.country = payload.country.toUpperCase();
    return payload;
  };

  const handleSubmit = async (isFinal = false, isInitialCreate = false) => {
    setIsSubmitting(true);
    setError(null);
    setErrors({});
    try {
      if (isInitialCreate) {
        const { name, surname, dob, email } = formData;
        const data = await startProfile({
          first_name: name,
          last_name: surname,
          dob,
          email,
        });
        setProfileId(data.id);
        localStorage.setItem("profile_id", data.id);
        if (data.status === "verified_resume") {
          setFlow("thankyou");
        } else {
          setFlow("verify_wait");
        }
      } else if (isFinal && profileId) {
        // The image step has already validated and patched its data.
        // We now patch the remaining text-based data and complete the profile.
        const payload = buildProfilePatchPayload();
        if (Object.keys(payload).length > 0) {
          await patchProfile(payload);
        }

        await completeProfile(profileId);
        localStorage.removeItem("profile_id");
        setProfileId(null);
        setFlow("comingsoon");
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setErrors({ email: err.message });
      } else {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(message);
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const WaitingForVerification = () => (
    <StepContainer>
      <h2>Check your email to verify</h2>
      <p style={{ textAlign: "center", margin: "0.5rem auto" }}>
        We’ve sent you a verification link. Click it to continue.
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
      >
        <div className="spinner" />
      </div>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          textAlign: "center",
        }}
      >
        Didn’t get it? Check spam or{" "}
        <span
          className="link-accent"
          style={{ cursor: "pointer" }}
          onClick={() => {
            /* TODO: Implement resend logic */
          }}
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
    if (flow === "thankyou") {
      return (
        <ThankYouStepComponent
          nextStep={() => {
            setFlow("profile");
            setStepIndex(0);
          }}
        />
      );
    }

    const steps = flow === "initial" ? initialSignupSteps : profileSetupSteps;
    const current = steps[stepIndex];
    if (!current) return <p>Invalid step index {stepIndex}.</p>;

    const isLastStep =
      flow === "profile" && stepIndex === profileSetupSteps.length - 1;
    const onNext = isLastStep ? () => handleSubmit(true, false) : nextStep;

    const commonProps: CommonStepProps = {
      formData,
      updateFormData,
      nextStep: onNext,
      prevStep,
      isSubmitting,
      handleSubmit: () => handleSubmit(isLastStep),
      profileId,
      errors,
    };

    if ("type" in current && current.type === "option") {
      const StepComponent = current.component;
      const stepProps = current.props;
      const selected = formData[stepProps.field];

      return (
        <StepComponent
          {...commonProps}
          {...stepProps}
          selected={selected}
          onBack={prevStep}
        />
      );
    }

    const StepComponent = current.component;
    return <StepComponent {...commonProps} />;
  };

  const getProgressBarProps = () => {
    if (flow === "initial")
      return { currentStep: stepIndex, totalSteps: initialSignupSteps.length };
    if (flow === "verify_wait" || flow === "thankyou")
      return {
        currentStep: initialSignupSteps.length,
        totalSteps: initialSignupSteps.length,
      };
    return { currentStep: stepIndex, totalSteps: profileSetupSteps.length };
  };

  const { currentStep, totalSteps } = getProgressBarProps();

  const getTitle = () => {
    if (flow === "initial" || flow === "verify_wait" || flow === "thankyou")
      return "Join Us";
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
          <p
            style={{
              color: "var(--accent)",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
}
