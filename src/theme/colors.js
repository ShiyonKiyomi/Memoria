// src/theme/colors.js
// Pulled from Figma Dev Mode (Inspect panel, platform selector set to React Native).
// Update these hex values as you go through each frame in Section 3 of the guide —
// these are placeholders based on the base palette named in the Implementation Plan.

export const colors = {
  primary: "#A665DF",     // primary purple - buttons, active states, accents
  primaryDark: "#8A4FC2", // pressed/active variant of primary - measure from Figma if it exists
  bgLight: "#EADBF9",     // light purple background (cards, sections)
  bgLighter: "#FBF7FF",   // lightest background (screen background)
  textDark: "#2A2A2A",    // primary body text
  textMuted: "#6B6B6B",   // secondary / caption text
  white: "#FFFFFF",
  error: "#D64545",       // form validation / error states
  success: "#3FA34D",     // confirmation states (e.g. reminder saved)
  border: "#E0D0F2",      // subtle borders/dividers on light backgrounds
};
