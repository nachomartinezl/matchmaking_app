'use client';

import React, { useEffect, useMemo, useState } from 'react';
import StepContainer from './common/StepContainer';
import { supabase } from '@/lib/supabaseClient';

interface StepProps {
  formData: {
    profilePicture: File | null;
    gallery: File[];
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

type UploadState = 'idle' | 'uploading' | 'saving' | 'done';

export default function Step12_ProfileGallery({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
}: StepProps) {
  const [profileId, setProfileId] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [error, setError] = useState<string | null>(null);

  // ---- PREVIEW URLS (no upload yet) ----
  const profilePreview = useMemo(
    () => (formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : null),
    [formData.profilePicture]
  );

  const galleryPreviews = useMemo(
    () => formData.gallery.map((f) => URL.createObjectURL(f)),
    [formData.gallery]
  );

  // Cleanup Object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      galleryPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [profilePreview, galleryPreviews]);

  useEffect(() => {
    const savedId = localStorage.getItem('profile_id');
    if (savedId) setProfileId(savedId);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      updateFormData({ profilePicture: e.target.files[0] });
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const current = formData.gallery || [];
    // cap to 6 total
    const next = [...current, ...files].slice(0, 6);
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

  // ========== Your existing “upload on Next” logic stays the same ==========
  const safeName = (name: string) =>
    name.replace(/[^a-zA-Z0-9.\-_]/g, '_').toLowerCase();

  const getPublicUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadFile = async (
    bucket: 'profile-pictures' | 'profile-gallery',
    path: string,
    file: File
  ) => {
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: true,
      cacheControl: '3600',
    });
    if (error) throw error;
    return getPublicUrl(bucket, path);
  };

  const saveToBackend = async (
    profile_picture_url: string | null,
    gallery_urls: string[]
  ) => {
    if (!profileId) throw new Error('Missing profile_id');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_picture_url: profile_picture_url || undefined,
          gallery_urls: gallery_urls.length ? gallery_urls : undefined,
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || 'Failed to save image URLs');
    }
    return res.json();
  };

  const handleSaveAndNext = async () => {
    setError(null);

    try {
      if (!profileId) {
        setError('Missing profile id. Please go back and restart signup.');
        return;
      }

      setUploadState('uploading');

      // 1) Upload profile picture
      let profileUrl: string | null = null;
      if (formData.profilePicture) {
        const p = formData.profilePicture;
        const path = `${profileId}/${Date.now()}-${safeName(p.name)}`;
        profileUrl = await uploadFile('profile-pictures', path, p);
      }

      // 2) Upload gallery (cap at 6)
      const galleryUrls: string[] = [];
      for (const file of formData.gallery.slice(0, 6)) {
        const path = `${profileId}/${Date.now()}-${safeName(file.name)}`;
        const url = await uploadFile('profile-gallery', path, file);
        galleryUrls.push(url);
      }

      setUploadState('saving');

      // 3) Persist URLs in DB
      await saveToBackend(profileUrl, galleryUrls);

      setUploadState('done');

      // 4) Advance
      nextStep();
    } catch (e: any) {
      console.error(e);
      setError(e?.message || 'Upload failed');
      setUploadState('idle');
    }
  };

  const busy = isSubmitting || uploadState === 'uploading' || uploadState === 'saving';

  return (
    <StepContainer>
      <h2>Show us your best photos</h2>

      {/* PROFILE PICTURE PICKER + PREVIEW */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="profilePicture">Profile picture</label>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label className="button-secondary" style={{ cursor: 'pointer', margin: 0 }}>
            Choose file
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfileChange}
              disabled={busy}
              style={{ display: 'none' }}
            />
          </label>

          {profilePreview ? (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
              }}
            >
              <img
                src={profilePreview}
                alt="Profile preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                className="icon-button"
                onClick={removeProfile}
                type="button"
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: '#222',
                  border: '1px solid var(--border)',
                }}
                disabled={busy}
                aria-label="Remove profile picture"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>No picture selected</span>
          )}
        </div>
      </div>

      {/* GALLERY PICKER + PREVIEWS GRID */}
      <div style={{ marginTop: '1.25rem' }}>
        <label htmlFor="gallery">More pics you want to show off</label>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label className="button-secondary" style={{ cursor: 'pointer', margin: 0 }}>
            Add images
            <input
              type="file"
              id="gallery"
              name="gallery"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              disabled={busy}
              style={{ display: 'none' }}
            />
          </label>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Up to 6 images
          </span>
        </div>

        {galleryPreviews.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {galleryPreviews.map((src, idx) => (
              <div
                key={src}
                style={{
                  position: 'relative',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  height: 110,
                }}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  className="icon-button"
                  onClick={() => removeFromGallery(idx)}
                  type="button"
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    background: '#222',
                    border: '1px solid var(--border)',
                  }}
                  disabled={busy}
                  aria-label={`Remove image ${idx + 1}`}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATUS + ERRORS */}
      {uploadState === 'uploading' && (
        <p style={{ color: 'var(--text-secondary)' }}>Uploading images…</p>
      )}
      {uploadState === 'saving' && (
        <p style={{ color: 'var(--text-secondary)' }}>Saving URLs…</p>
      )}
      {error && (
        <p style={{ color: '#ff5555', marginTop: '0.5rem' }}>{error}</p>
      )}

      <div className="button-group" style={{ marginTop: '1.25rem' }}>
        <button onClick={prevStep} className="button-secondary" disabled={busy}>
          Back
        </button>
        <button onClick={handleSaveAndNext} className="button-primary" disabled={busy}>
          {busy ? 'Working…' : 'Next'}
        </button>
      </div>
    </StepContainer>
  );
}
