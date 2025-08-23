// src/lib/validationSchemas.ts

import { z } from "zod";

// --- Constants for File Validation ---
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB hard limit
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// --- Zod Schema Definition ---
export const profileSchema = z
  .object({
    // --- INITIAL SIGNUP FIELDS ---
    name: z.string().min(2, "First name must be at least 2 characters."),
    surname: z.string().min(2, "Last name must be at least 2 characters."),
    dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date.")
      .refine(
        (date) => new Date(date).getTime() < Date.now(),
        "Birthday can't be in the future."
      )
      .refine((date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age >= 18;
      }, "You must be at least 18 years old to sign up."),
    email: z.string().email("Please enter a valid email address."),

    // --- PROFILE SETUP FIELDS ---
    gender: z.enum(["male", "female", "non-binary", "other"], {
      message: "Please select an option.",
    }).optional(),
    country: z.string().length(2, "Please select a country.").optional(),
    preference: z.enum(["women", "men", "both", "not_sure"], {
      message: "Please select a preference.",
    }).optional(),

    // Accept numbers coming as strings from the form
    height_feet: z.coerce
      .number()
      .min(3, "Too short")
      .max(8, "Too tall")
      .optional(),
    height_inches: z.coerce.number().min(0).max(11).optional(),

    religion: z.enum(
      [
        "atheism",
        "buddhism",
        "christianity",
        "hinduism",
        "islam",
        "judaism",
        "other",
        "none",
      ],
      { message: "Please select an option." }
    ).optional(),
    pets: z.array(z.string()).min(1, "Please select at least one option.").optional(),
    smoking: z.enum(["regularly", "when_drink", "sometimes", "never"], {
      message: "Please select an option.",
    }).optional(),
    drinking: z.enum(["often", "on_holidays", "sometimes", "never"], {
      message: "Please select an option.",
    }).optional(),
    kids: z.enum(["i_have", "i_want_to", "i_do_not_want", "not_sure"], {
      message: "Please select an option.",
    }).optional(),
    goal: z.enum(["friends", "casual", "relationship", "not_sure"], {
      message: "Please select an option.",
    }).optional(),

    // --- FILE UPLOADS ---
    profilePicture: z
      .instanceof(File, { message: "A profile picture is required." })
      .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
      .nullable().optional(),

    gallery: z
      .array(z.instanceof(File))
      .max(6, "You can upload a maximum of 6 images.")
      .refine(
        (files) => files.every((f) => f.size <= MAX_FILE_SIZE),
        "Each file must be less than 5MB."
      )
      .refine(
        (files) => files.every((f) => ACCEPTED_IMAGE_TYPES.includes(f.type)),
        "Only .jpg, .jpeg, .png and .webp files are accepted."
      ).optional(),

    description: z
      .string()
      .min(100, "Bio must be at least 100 characters.")
      .max(500, "Bio cannot exceed 500 characters.").optional(),
  })
  .refine(
    (data) =>
      (data.height_feet !== undefined && data.height_inches !== undefined) ||
      (data.height_feet === undefined && data.height_inches === undefined),
    {
      message: "Please enter both feet and inches for your height.",
      path: ["height_feet"],
    }
  );

// This is our new FormData type. It's inferred directly from the schema!
export type ProfileFormData = z.infer<typeof profileSchema>;
