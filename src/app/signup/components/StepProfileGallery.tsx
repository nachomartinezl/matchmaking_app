'use client';

import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const savedId = localStorage.getItem('profile_id');
    if (savedId) setProfileId(savedId);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFormData({ profilePicture: e.target.files[0] });
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5);
      updateFormData({ gallery: files });
    }
  };

  // Tiny helper to prevent weird filenames
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

      // 2) Upload gallery (max 6 in DB constraint; we already limit to 5 here)
      const galleryUrls: string[] = [];
      for (const file of formData.gallery) {
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

      <label htmlFor="profilePicture">Profile picture</label>
      <input
        type="file"
        id="profilePicture"
        name="profilePicture"
        accept="image/*"
        onChange={handleProfileChange}
        disabled={busy}
      />
      {formData.profilePicture && <p>Selected: {formData.profilePicture.name}</p>}

      <label htmlFor="gallery">More pics you want to show off</label>
      <input
        type="file"
        id="gallery"
        name="gallery"
        accept="image/*"
        multiple
        onChange={handleGalleryChange}
        disabled={busy}
      />
      {formData.gallery.length > 0 && (
        <ul>
          {formData.gallery.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      {uploadState === 'uploading' && (
        <p style={{ color: 'var(--text-secondary)' }}>Uploading images…</p>
      )}
      {uploadState === 'saving' && (
        <p style={{ color: 'var(--text-secondary)' }}>Saving URLs…</p>
      )}
      {error && (
        <p style={{ color: '#ff5555', marginTop: '0.5rem' }}>{error}</p>
      )}

      <div className="button-group">
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
