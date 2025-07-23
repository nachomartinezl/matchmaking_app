'use client';

interface StepProps {
  formData: {
    profilePicture: File | null;
    description: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function Step10_Profile({ formData, updateFormData, handleSubmit, prevStep, isSubmitting }: StepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFormData({ profilePicture: e.target.files[0] });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value });
  };
  
  return (
    <div className="form-step">
      <h2>Your Profile</h2>
      <label htmlFor="profilePicture">Upload a picture</label>
      <input 
        type="file" 
        id="profilePicture" 
        name="profilePicture" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={isSubmitting}
      />
      {/* Optional: Show a preview of the selected image */}
      {formData.profilePicture && <p>Selected: {formData.profilePicture.name}</p>}

      <label htmlFor="description">Short Description</label>
      <textarea 
        id="description" 
        name="description"
        value={formData.description} 
        onChange={handleTextChange} 
        placeholder="Tell us something about yourself..."
        disabled={isSubmitting}
      />

      <div className="button-group">
        <button 
          onClick={prevStep} 
          className="button-secondary"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Finishing...' : 'Finish Sign Up'}
        </button>
      </div>
    </div>
  );
}
