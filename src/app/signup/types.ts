export interface FormData {
  email: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  country: string;
  preference: string;
  height: string;
  religion: string;
  pets: string[];
  smoking: string;
  drinking: string;
  kids: string;
  maritalStatus: string;
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
