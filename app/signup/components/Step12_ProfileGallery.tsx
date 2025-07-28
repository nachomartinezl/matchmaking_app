'use client';

import React from 'react';
import StepContainer from './common/StepContainer';

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

export default function Step12_ProfileGallery({ formData, updateFormData, nextStep, prevStep, isSubmitting }: StepProps) {
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

  return (
    <StepContainer>
      <h2>Profile Picture & Gallery</h2>
      <label htmlFor="profilePicture">Upload a picture</label>
      <input
        type="file"
        id="profilePicture"
        name="profilePicture"
        accept="image/*"
        onChange={handleProfileChange}
        disabled={isSubmitting}
      />
      {formData.profilePicture && <p>Selected: {formData.profilePicture.name}</p>}

      <label htmlFor="gallery">Upload Gallery (up to 5 images)</label>
      <input
        type="file"
        id="gallery"
        name="gallery"
        accept="image/*"
        multiple
        onChange={handleGalleryChange}
        disabled={isSubmitting}
      />
      {formData.gallery.length > 0 && (
        <ul>
          {formData.gallery.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary" disabled={isSubmitting}>
          Back
        </button>
        <button onClick={nextStep} className="button-primary" disabled={isSubmitting}>
          Next
        </button>
      </div>
    </StepContainer>
  );
}
