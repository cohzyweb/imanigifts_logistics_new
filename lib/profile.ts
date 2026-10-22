import type { Portal, UserProfile } from "@/types";
import { adminUser, customerUser } from "./data";
import { STORAGE_KEYS, load, save } from "./storage";

function profileKey(portal: Portal): string {
  return `${STORAGE_KEYS.profile}.${portal}`;
}

export function getSavedProfile(portal: Portal): Partial<UserProfile> {
  return load<Partial<UserProfile>>(profileKey(portal), {});
}

export function getProfile(
  portal: Portal,
  session?: { name?: string; email?: string } | null,
): UserProfile {
  const base = portal === "admin" ? adminUser : customerUser;
  const saved = getSavedProfile(portal);
  return {
    ...base,
    ...saved,
    ...(session?.name ? { name: session.name } : {}),
    ...(session?.email ? { email: session.email } : {}),
  };
}

export function saveProfile(portal: Portal, patch: Partial<UserProfile>): void {
  save(profileKey(portal), { ...getSavedProfile(portal), ...patch });
}
