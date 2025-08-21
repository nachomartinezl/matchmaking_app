// src/lib/api.ts
export type UUID = string;
const API = process.env.NEXT_PUBLIC_API_URL!;

export async function startProfile(payload: {
  first_name: string;
  last_name: string;
  dob: string; // YYYY-MM-DD
  email: string;
  gender?: string;
  country?: string;
}): Promise<{ id: UUID }> {
  const r = await fetch(`${API}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw await r.json().catch(() => new Error("Failed to start profile"));
  return r.json();
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
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to update profile");
  }
  return res.json();
}

export async function completeProfile(id: UUID) {
  const r = await fetch(`${API}/profiles/${id}/complete`, { method: "POST" });
  if (!r.ok) throw await r.json().catch(() => new Error("Failed to complete profile"));
  return r.json(); // ProfileOut
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
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to submit questionnaire");
  }
  return res.json();
}
