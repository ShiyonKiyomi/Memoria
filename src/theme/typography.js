// src/theme/typography.js
// Font sizes are numbers. Font weights are STRINGS in React Native ("700", not 700).
// fontFamily values below assume Poppins loaded via @expo-google-fonts/poppins —
// swap the family name if Figma specifies a different typeface.

export const fontSizes = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  caption: 13,
};

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

// Reference these by name once fonts are loaded with useFonts() in app/_layout.jsx.
// React Native does NOT synthesize bold - each weight must be its own loaded font file.
export const fontFamilies = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};
