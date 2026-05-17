import type { ReactNode } from "react";

/**
 * Inline SVG icon registry. All icons render at 24x24 (controlled by parent),
 * use stroke-based geometry with width 1.5 and currentColor so they inherit
 * the chip's tint. Each glyph is intentionally simplified — these are ambient
 * decorations, not brand-accurate logos.
 */

type IconProps = { size?: number };

const baseSvg = (children: ReactNode, size: number) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const SkillIcons: Record<string, (p?: IconProps) => ReactNode> = {
  Swift: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M5 5c4 4 7 7 10 11-4-1-7-2-10-4" />
        <path d="M16 5c1 3 2 6 3 9-1 1-2 2-4 2" />
      </>,
      size
    ),

  Dart: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M5 13 13 5l6 6-8 8H5z" />
        <path d="M11 19v-6h6" />
      </>,
      size
    ),

  Flutter: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M15 3 5 13l4 4 10-10z" />
        <path d="M9 17l4 4 6-6-4-4" />
      </>,
      size
    ),

  SwiftUI: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M7 12h10M12 7v10" />
      </>,
      size
    ),

  iOS: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M15 4a3 3 0 0 1-3 3" />
        <path d="M8 11c0-2 2-3 4-3s4 1 4 3c0 4-5 3-5 7 0 1.5 1 2 2 2" />
        <path d="M7 20c1 0 2-.5 2-2" />
      </>,
      size
    ),

  Firebase: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M5 18 8 4l4 7 3-3 4 10z" />
        <path d="M5 18l14-2" />
      </>,
      size
    ),

  Xcode: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </>,
      size
    ),

  Git: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 12h6M18 8v8" />
      </>,
      size
    ),

  JavaScript: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M10 10v5a2 2 0 1 1-4 0" />
        <path d="M18 11a2 2 0 0 0-2-2c-1.5 0-2 1-2 2 0 2 4 2 4 4a2 2 0 0 1-2 2c-1.5 0-2-1-2-2" />
      </>,
      size
    ),

  TypeScript: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10h5M9.5 10v8" />
        <path d="M18 11a2 2 0 0 0-2-2c-1.5 0-2 1-2 2 0 2 4 2 4 4a2 2 0 0 1-2 2c-1.5 0-2-1-2-2" />
      </>,
      size
    ),

  Python: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M9 4h4a3 3 0 0 1 3 3v4H8a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h4" />
        <path d="M15 20h-4a3 3 0 0 1-3-3v-4h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4" />
        <circle cx="9.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="14.5" cy="16.5" r=".5" fill="currentColor" />
      </>,
      size
    ),

  REST: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M3 12a9 9 0 0 0 18 0 9 9 0 0 0-18 0z" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>,
      size
    ),

  GraphQL: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M12 3l8 5v8l-8 5-8-5V8z" />
        <path d="M4 8l16 8M20 8 4 16M12 3v18" />
      </>,
      size
    ),

  GitHub: ({ size = 20 } = {}) =>
    baseSvg(
      <>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </>,
      size
    ),
};

export type SkillName = keyof typeof SkillIcons;

export const ALL_SKILL_NAMES: SkillName[] = [
  "Swift",
  "Dart",
  "Flutter",
  "SwiftUI",
  "iOS",
  "Firebase",
  "Xcode",
  "Git",
  "JavaScript",
  "TypeScript",
  "Python",
  "REST",
  "GraphQL",
  "GitHub",
];
