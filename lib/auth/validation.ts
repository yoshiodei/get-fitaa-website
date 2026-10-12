export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Accepts +233XXXXXXXXX or 0XXXXXXXXX (spaces and dashes allowed). */
export const isGhanaPhone = (v: string) =>
  /^(\+233|0)\d{9}$/.test(v.replace(/[\s-]/g, ""));

/** Move keyboard focus to the first invalid field after a failed submit. */
export const focusFirstError = (ids: string[]) => {
  const el = ids.map((id) => document.getElementById(id)).find(Boolean);
  el?.focus();
};