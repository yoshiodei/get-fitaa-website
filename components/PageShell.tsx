import type { ReactNode } from "react";
 
/**
 * Controls the side whitespace for the whole site.
 *
 * - mobile + tablet (< 1024px): edge to edge, no gutter
 * - lg desktop (>= 1024px):     small gutter (24px)
 * - 2xl desktop (>= 1536px):    slightly larger gutter (40px)
 * - very wide / 4K (>= 1920px): content capped at 1680px and centred,
 *                               so the extra screen width becomes whitespace
 *
 * Wrap every section (navbar included) inside this once, in app/layout.tsx.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full 2xl:px-10">
      <div className="mx-auto w-full max-w-[1680px] bg-white">{children}</div>
    </div>
  );
}