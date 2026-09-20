// src/theme/typography.js
// CORRECTION: the real typeface is Inter, not Poppins — confirmed by the
// "Inter-Regular/Medium/SemiBold/Bold" fontFamily values in every exported
// component. Update app/_layout.jsx's font loading to match (see note below).

export const fontSizes = {
  screenTitle: 22,   // top header bar text ("Dashboard", "Calendar")
  sectionTitle: 20,  // section headings ("Reminders"); "Learnings" measures 24 — treat as an outlier, confirm with design if intentional
  cardTitle: 18,     // card headline text ("Dementia and its Stages")
  body: 15,          // calendar day numbers, row labels
  bodyText: 14,      // paragraph copy, button labels, medication time
  caption: 12,       // small eyebrow labels ("CURRENT BOOK")
  tabLabel: 10,       // bottom nav bar labels
};

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

// Reference these by name once fonts are loaded with useFonts() in
// app/_layout.jsx. React Native does NOT synthesize bold — each weight must
// be its own loaded font file.
export const fontFamilies = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};
