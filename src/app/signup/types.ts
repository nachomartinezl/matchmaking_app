export interface FormData {
  email: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height: string;            // keep if you’re still using it somewhere
  height_feet?: number;      // NEW
  height_inches?: number;    // NEW
  religion: string;
  pets: string[];            // NOTE: backend expects a single enum; we’ll pick first
  smoking: string;
  drinking: string;
  kids: string;              // normalize to backend enums later
  goal: string;
  profilePicture: File | null;
  gallery: string[];         // if you upload and store URLs; if still File[] convert to URLs first
  description: string;
}

export interface CommonStepProps {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  handleSubmit: () => void;
}
