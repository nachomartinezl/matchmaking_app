"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import StepContainer from "./common/StepContainer";
import { uploadFile, patchProfile } from "@/lib/api";
import { profileSchema } from "@/lib/validationSchemas";
import { FormData } from "../types";
import { processImage } from "@/lib/imageProcessor";

const stepSchema = profileSchema.pick({ profilePicture: true, gallery: true });

interface StepProps {
  formData: Pick<FormData, "profilePicture" | "gallery">;
  updateFormData: (
    data: Partial<Pick<FormData, "profilePicture" | "gallery">>
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  profileId: string | null;
}

type UploadState = "idle" | "processing" | "uploading" | "saving";

export default function StepProfileGallery({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
  profileId,
}: StepProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errors, setErrors] = useState<{
    profilePicture?: string[];
    gallery?: string[];
  }>({});

  const toSrc = (f: Blob): string => URL.createObjectURL(f);

  const profilePreview = useMemo(() => {
    const f = formData.profilePicture;
    return f instanceof Blob ? toSrc(f) : null;
  }, [formData.profilePicture]);

  const galleryPreviews = useMemo(() => {
    const galleryFiles = (formData.gallery ?? []).filter(
      (f) => f instanceof Blob
    );
    return galleryFiles.map(toSrc);
  }, [formData.gallery]);

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      galleryPreviews.forEach(URL.revokeObjectURL);
    };
  }, [profilePreview, galleryPreviews]);

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadState("processing");
    setErrors({});
    try {
      const processedFile = await processImage(file);
      updateFormData({ profilePicture: processedFile });
    } catch (error) {
      console.error("Image processing failed:", error);
      setErrors({ profilePicture: ["Could not process this image."] });
    } finally {
      setUploadState("idle");
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    setErrors({});
    const currentGallery = (formData.gallery ?? []).filter(
      (f) => f instanceof Blob
    );
    if (currentGallery.length + selected.length > 6) {
      setErrors({ gallery: ["You can only upload a maximum of 6 images."] });
      return;
    }
    setUploadState("processing");
    try {
      const processingPromises = selected.map(processImage);
      const processedFiles = await Promise.all(processingPromises);
      const next = [...currentGallery, ...processedFiles];
      updateFormData({ gallery: next });
    } catch (error) {
      console.error("Gallery processing failed:", error);
      setErrors({ gallery: ["Could not process one or more images."] });
    } finally {
      setUploadState("idle");
    }
  };

  const removeProfile = () => updateFormData({ profilePicture: null });
  const removeFromGallery = (idx: number) => {
    const currentGallery = (formData.gallery ?? []).filter(
      (f) => f instanceof Blob
    );
    const next = [...currentGallery];
    next.splice(idx, 1);
    updateFormData({ gallery: next });
  };

  const safeName = (file: File): string => (
    file.name.normalize("NFKD").replace(/[^\w.\-]+/g, "_").slice(0, 100)
  );

  // --- The 'Next' handler is now synchronous and only validates ---
  const handleSaveAndNext = async () => {
    const validationResult = stepSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }
    const currentGallery = (formData.gallery ?? []).filter(f => f instanceof Blob);
    if (!formData.profilePicture && currentGallery.length === 0) {
      setErrors({ profilePicture: ["Please add at least one image."] });
      return;
    }
    if (busy) return;
    setErrors({});
    try {
      if (!profileId) {
        setErrors({ profilePicture: ["Missing profile ID. Please restart signup."] });
        return;
      }
      setUploadState("uploading");
      let profileUrl: string | null = null;
      if (formData.profilePicture) {
        const file = formData.profilePicture;
        const path = `${profileId}/${Date.now()}-${safeName(file)}`;
        profileUrl = await uploadFile("profile-pictures", path, file);
      }
      const uploadPromises = currentGallery.map((file, i) => {
        const path = `${profileId}/${Date.now()}_${i}-${safeName(file)}`;
        return uploadFile("profile-gallery", path, file);
      });
      const galleryUrls = await Promise.all(uploadPromises);
      setUploadState("saving");
      await patchProfile({
        profile_picture_url: profileUrl || undefined,
        gallery_urls: galleryUrls.length ? galleryUrls : undefined,
      });
      nextStep();
    } catch (e: unknown) {
      console.error(e);
      const message = e instanceof Error ? e.message : "An unknown error occurred.";
      setErrors({ profilePicture: [message || "Upload failed. Please try again."] });
      setUploadState("idle");
    }
  };

  // The component is "busy" if it's processing an image OR if the parent form is submitting.
  const busy = isSubmitting || uploadState !== 'idle';
  const mainError = errors.profilePicture?.[0] || errors.gallery?.[0];

  return (
    <StepContainer>
      <h2>Show us your best photos</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="profilePicture">Profile picture</label>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label className={`button-secondary button-compact ${busy ? 'disabled' : ''}`} style={{ cursor: "pointer", margin: 0 }}>
            Choose file
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfileChange}
              disabled={busy}
              style={{ display: "none" }}
            />
          </label>
          {profilePreview ? (
            <div className="profile-preview-container">
              <Image src={profilePreview} alt="Profile preview" className="profile-preview-image" width={100} height={100} />
              <button
                className="icon-button remove-image-button"
                onClick={removeProfile}
                type="button"
                disabled={busy}
                aria-label="Remove profile picture"
                title="Remove"
              >
                ×
              </button>
            </div>
          ) : (
            <span style={{ color: "var(--text-secondary)" }}>No picture selected</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <label htmlFor="gallery">More pics you want to show off</label>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <label className={`button-secondary button-compact ${busy ? 'disabled' : ''}`} style={{ cursor: "pointer", margin: 0 }}>
            Add images
            <input
              type="file"
              id="gallery"
              name="gallery"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              disabled={busy}
              style={{ display: "none" }}
            />
          </label>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Up to 6 images
          </span>
        </div>
        {galleryPreviews.length > 0 && (
          <div className="gallery-grid">
            {galleryPreviews.map((src, idx) => (
              <div key={`${idx}-${src}`} className="gallery-item">
                <Image src={src} alt={`Gallery ${idx + 1}`} className="gallery-item-image" width={150} height={150} />
                <button
                  className="icon-button remove-image-button"
                  onClick={() => removeFromGallery(idx)}
                  type="button"
                  disabled={busy}
                  aria-label={`Remove image ${idx + 1}`}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {uploadState === 'processing' && (
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', margin: '1rem 0'}}>Optimizing images...</p>
      )}
      {(uploadState === "uploading" || uploadState === "saving") && (
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <div className="spinner" />
        </div>
      )}
      {mainError && (
        <p className="error-message" style={{ textAlign: 'center', marginTop: '1rem' }}>
          {mainError}
        </p>
      )}

      <div className="button-group" style={{ marginTop: "1.25rem" }}>
        <button onClick={prevStep} className="button-secondary" disabled={busy}>
          Back
        </button>
        <button onClick={handleSaveAndNext} className="button-primary" disabled={busy}>
          {uploadState === 'processing' ? 'Processing...' : uploadState === 'uploading' ? 'Uploading...' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
