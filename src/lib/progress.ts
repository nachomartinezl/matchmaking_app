// src/lib/progress.ts
const KEY = "signup_progress_v1";

export type SavedProgress = {
  profile_id: string;
  flow: "verify_wait" | "thankyou" | "profile";
  stepIndex: number;
  formData: Record<string, any>;
  savedAt: number;
};

export function saveProgress(data: SavedProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedProgress) : null;
  } catch {
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
