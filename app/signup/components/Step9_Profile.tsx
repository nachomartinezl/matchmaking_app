'use client';

interface StepProps {
  formData: {
    profilePicture: File | null;
    description: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step9_Profile({ formData, updateFormData, nextStep, prevStep }: StepProps) {
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
      <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} />
      {/* Optional: Show a preview of the selected image */}
      {formData.profilePicture && <p>Selected: {formData.profilePicture.name}</p>}

      <label htmlFor="description">Short Description</label>
      <textarea 
        id="description" 
        name="description"
        value={formData.description} 
        onChange={handleTextChange} 
        placeholder="Tell us something about yourself..."
      />

      <div className="button-group">
        <button onClick={prevStep} className="button-secondary">Back</button>
        <button onClick={nextStep} className="button-primary">Next</button>
      </div>
    </div>
  );
}
