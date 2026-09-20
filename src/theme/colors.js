// src/theme/colors.js
// REAL values extracted from Figma Dev Mode → React Native exports
// (Dashboard, Calendar empty state, Notes). Replaces earlier placeholders.

export const colors = {
  primary: "#A665DF",        // buttons, selected day, active states
  primaryTint15: "rgba(166, 101, 223, 0.15)", // header bands (Dashboard/Calendar/Notes headers)
  primaryTint10: "rgba(166, 101, 223, 0.10)", // calendar card background
  primaryTint8: "rgba(166, 101, 223, 0.08)",  // "current book"/"current lesson" cards, empty-state card

  bgScreen: "#FBF7FF",       // overall screen background
  bgLavender: "#F3E9FC",     // month-row / selected-day-text-on-purple background
  bgLavenderAlt: "#F8F3FD",  // medication row background

  textDark: "#563979",       // headings, primary text (was #2A2A2A — corrected)
  textMuted: "#A471D0",      // secondary/muted labels, tab-inactive text (was #6B6B6B — corrected)
  textBody: "rgba(86, 57, 121, 0.85)", // paragraph/body copy (slightly translucent textDark)

  white: "#FFFFFF",

  // One-off accent seen only on the Notes card background — not part of the
  // main purple palette, keep it named separately rather than folding it
  // into a generic "accent" token.
  noteHighlight: "#F3ECC0",

  // Not yet confirmed in an exported frame — keep placeholders until a
  // frame with an error or success state is exported.
  error: "#D64545",
  success: "#3FA34D",
  border: "#E0D0F2",
};
