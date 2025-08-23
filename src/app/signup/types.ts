// src/app/signup/types.ts
import { profileSchema } from "@/lib/validationSchemas"; // Adjust path if needed
import { z } from "zod";

// The Zod schema is now the source of truth for the form's shape and types.
export type FormData = z.infer<typeof profileSchema>;

// 2. Export specific enum types for our selection-based components
export type Gender = NonNullable<FormData['gender']>;
export type Preference = NonNullable<FormData['preference']>;
export type Religion = NonNullable<FormData['religion']>;
export type SmokingHabit = NonNullable<FormData['smoking']>;
export type DrinkingHabit = NonNullable<FormData['drinking']>;
export type KidsStatus = NonNullable<FormData['kids']>;
export type RelationshipGoal = NonNullable<FormData['goal']>;
// ... and so on for any other enums

export interface CommonStepProps {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  handleSubmit: () => void;
  profileId: string | null;
  errors: Partial<Record<keyof FormData, string | undefined>>;
}
