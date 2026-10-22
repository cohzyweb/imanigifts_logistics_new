import type { Session } from "@/types";
import { STORAGE_KEYS, load, remove, save } from "./storage";

export function getSession(): Session | null {
  return load<Session | null>(STORAGE_KEYS.session, null);
}

export function setSession(session: Omit<Session, "createdAt">): Session {
  const full: Session = { ...session, createdAt: new Date().toISOString() };
  save(STORAGE_KEYS.session, full);
  return full;
}

export function clearSession(): void {
  remove(STORAGE_KEYS.session);
}
