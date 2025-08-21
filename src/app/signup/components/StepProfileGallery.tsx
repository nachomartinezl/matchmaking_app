"use client";

import React, { useEffect, useMemo, useState } from "react";
import StepContainer from "./common/StepContainer";
import { uploadFile, patchProfile } from "@/lib/api";

// turn anything into a usable <img src>
const toSrc = (f: File | Blob | string): string | null => {
  if (f instanceof Blob) return URL.createObjectURL(f);
  if (typeof f === "string") return f;
  return null;
};

interface StepProps {
  formData: {
    profilePicture: File | null;
    gallery: File[];
  };
  updateFormData: (data: Partial<StepProps["formData"]>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

type UploadState = "idle" | "uploading" | "saving" | "done";

export default function Step12_ProfileGallery({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
}: StepProps) {
  const [profileId, setProfileId] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);

  // ---- PREVIEW URLS (no upload yet) ----
  const profilePreview = useMemo(() => {
    const f = formData.profilePicture;
    return f instanceof Blob ? URL.createObjectURL(f) : null;
  }, [formData.profilePicture]);

  const galleryPreviews = useMemo(() => {
    const files = Array.isArray(formData.gallery) ? formData.gallery : [];
    return files.map(toSrc).filter(Boolean) as string[];
  }, [formData.gallery]);

  // Cleanup Object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (profilePreview?.startsWith("blob:"))
        URL.revokeObjectURL(profilePreview);
      galleryPreviews
        .filter((u) => u.startsWith("blob:"))
        .forEach((u) => URL.revokeObjectURL(u));
    };
  }, [profilePreview, galleryPreviews]);

  useEffect(() => {
    const savedId = localStorage.getItem("profile_id");
    if (savedId) setProfileId(savedId);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      updateFormData({ profilePicture: e.target.files[0] });
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const current = Array.isArray(formData.gallery) ? formData.gallery : [];
    const next = [...current, ...selected]
      .filter((f) => (f?.type || "").startsWith("image/"))
      .slice(0, 6);

    updateFormData({ gallery: next });
  };

  const removeProfile = () => {
    updateFormData({ profilePicture: null });
  };

  const removeFromGallery = (idx: number) => {
    const next = [...formData.gallery];
    next.splice(idx, 1);
    updateFormData({ gallery: next });
  };

  // replaces: const safeName = (name: string) => ...
  function safeName(
    input?: { name?: string; type?: string } | string | Blob | null
  ): string {
    if (!input) return `upload_${Date.now()}.png`;

    // If it's a string, sanitize it as a filename
    if (typeof input === "string") {
      return (
        input
          .normalize?.("NFKD")
          .replace(/[^\w.\-]+/g, "_")
          .slice(0, 100) || `upload_${Date.now()}.png`
      );
    }

    // Try to read .name (File has it; Blob may not)
    const maybeName = (input as any).name;
    const mime = (input as any).type || "";
    const ext = mime?.includes("/") ? mime.split("/")[1] : "png";

    const base =
      typeof maybeName === "string" && maybeName.trim()
        ? maybeName
        : `upload_${Date.now()}.${ext || "png"}`;

    return base
      .normalize?.("NFKD")
      .replace(/[^\w.\-]+/g, "_")
      .slice(0, 100);
  }

  const handleSaveAndNext = async () => {
    if (busy) return;
    if (
      !formData.profilePicture &&
      (!formData.gallery || formData.gallery.length === 0)
    ) {
      setError("Please add at least one image");
      return;
    }
    setError(null);
    try {
      if (!profileId) {
        setError("Missing profile id. Please go back and restart signup.");
        return;
      }

      setUploadState("uploading");

      // --- normalize profile picture ---
      const p = formData.profilePicture;
      const profileIsFile = p && typeof (p as any).name === "string";
      let profileUrl: string | null = null;
      if (p) {
        const file = profileIsFile
          ? (p as File)
          : new File([p as Blob], safeName(p), {
              type: (p as any).type || "image/png",
            });
        const path = `${profileId}/${Date.now()}-${safeName(file)}`;
        profileUrl = await uploadFile("profile-pictures", path, file);
      }

      // --- normalize gallery (cap to 6, only images) ---
      const rawGallery = Array.isArray(formData.gallery)
        ? formData.gallery
        : [];
      const galleryFiles = rawGallery
        .filter(Boolean)
        .map((g, i) =>
          typeof (g as any).name === "string"
            ? (g as File)
            : new File([g as Blob], safeName(g), {
                type: (g as any).type || "image/png",
              })
        )
        .filter((f) => (f.type || "").startsWith("image/"))
        .slice(0, 6);

      const galleryUrls: string[] = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const path = `${profileId}/${Date.now()}_${i}-${safeName(file)}`;
        const url = await uploadFile("profile-gallery", path, file);
        galleryUrls.push(url);
      }

      setUploadState("saving");

      await patchProfile({
        profile_picture_url: profileUrl || undefined,
        gallery_urls: galleryUrls.length ? galleryUrls : undefined,
      });

      setUploadState("done");
      nextStep();
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Upload failed");
      setUploadState("idle");
    }
  };

  const busy =
    isSubmitting || uploadState === "uploading" || uploadState === "saving";

  return (
    <StepContainer>
      <h2>Show us your best photos</h2>

      {/* PROFILE PICTURE PICKER + PREVIEW */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="profilePicture">Profile picture</label>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label
            className="button-secondary"
            style={{ cursor: "pointer", margin: 0 }}
          >
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
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
              }}
            >
              <img
                src={profilePreview}
                alt="Profile preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                className="icon-button"
                onClick={removeProfile}
                type="button"
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#222",
                  border: "1px solid var(--border)",
                }}
                disabled={busy}
                aria-label="Remove profile picture"
                title="Remove"
              >
                âœ•
              </button>
            </div>
          ) : (
            <span style={{ color: "var(--text-secondary)" }}>
              No picture selected
            </span>
          )}
        </div>
      </div>

      {/* GALLERY PICKER + PREVIEWS GRID */}
      <div style={{ marginTop: "1.25rem" }}>
        <label htmlFor="gallery">More pics you want to show off</label>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label
            className="button-secondary"
            style={{ cursor: "pointer", margin: 0 }}
          >
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
          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {galleryPreviews.map((src, idx) => (
              <div
                key={`${idx}-${src}`}
                style={{
                  position: "relative",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  background: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                  height: 110,
                }}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  className="icon-button"
                  onClick={() => removeFromGallery(idx)}
                  type="button"
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "#222",
                    border: "1px solid var(--border)",
                  }}
                  disabled={busy}
                  aria-label={`Remove image ${idx + 1}`}
                  title="Remove"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATUS + ERRORS */}
      {(uploadState === "uploading" || uploadState === "saving") && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
          <div className="spinner" />
        </div>
      )}
      {error && (
        <p style={{ color: "#ff5555", marginTop: "0.5rem" }}>{error}</p>
      )}

      <div className="button-group" style={{ marginTop: "1.25rem" }}>
        <button onClick={prevStep} className="button-secondary" disabled={busy}>
          Back
        </button>
        <button
          onClick={handleSaveAndNext}
          className="button-primary"
          disabled={busy}
        >
          {busy ? "Working¦" : "Next"}
        </button>
      </div>
    </StepContainer>
  );
}
