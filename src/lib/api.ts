// src/lib/api.ts
import { supabase } from "./supabaseClient";
import { ApiError } from './errors';

export type UUID = string;
const API = process.env.NEXT_PUBLIC_API_URL!;

export async function getProfile(id: UUID) {
  const res = await fetch(`${API}/profiles/${id}`);
  if (!res.ok) {
    // Special case for polling: 404 means profile was deleted, not an error state.
    if (res.status === 404) return null;
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export async function startProfile(payload: {
  first_name: string;
  last_name: string;
  dob: string; // YYYY-MM-DD
  email: string;
}): Promise<{ id: UUID }> {
  const res = await fetch(`${API}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to start profile" }));
    throw new ApiError(errorData.detail, res.status, errorData);
  }
  return res.json();
}

export async function patchProfile(update: Record<string, unknown>) {
  const profileId = localStorage.getItem("profile_id");
  if (!profileId) throw new Error("Missing profile id");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to update profile" }));
    throw new ApiError(errorData.detail, res.status, errorData);
  }
  return res.json();
}

export async function completeProfile(id: UUID) {
  const res = await fetch(`${API}/profiles/${id}/complete`, { method: "POST" });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to complete profile" }));
    throw new ApiError(errorData.detail, res.status, errorData);
  } // ProfileOut
}

export async function resendVerificationEmail(id: UUID) {
  const res = await fetch(`${API}/profiles/${id}/resend`, { method: "POST" });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to resend verification email" }));
    throw new ApiError(errorData.detail, res.status, errorData);
  }
}

export async function submitQuestionnaire(payload: {
  questionnaire: string;
  responses: number[];
}) {
  const profileId = localStorage.getItem("profile_id");
  if (!profileId) throw new Error("Missing profile id");
  const res = await fetch(`${API}/profiles/${profileId}/questionnaire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Failed to submit questionnaire" }));
    throw new ApiError(errorData.detail, res.status, errorData);
  }
  return res.json();
}

// Centralized Supabase file upload
export async function uploadFile(
  bucket: "profile-pictures" | "profile-gallery",
  path: string,
  file: File
): Promise<string> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    cacheControl: "3600",
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
