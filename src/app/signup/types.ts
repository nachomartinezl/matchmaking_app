export interface FormData {
  email: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height_feet?: number;
  height_inches?: number;
  religion: string;
  pets: string[];
  smoking: string;
  drinking: string;
  kids: string; // normalize to backend enums later
  goal: string;
  profilePicture: File | null;
  gallery: File[];
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
