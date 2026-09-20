// src/theme/spacing.js
// Real values from the exports: screen horizontal padding is consistently
// 24, card padding is 20, section gap is 16.

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,   // card internal padding (was 16 as a guess — cards actually use 20)
  xl: 24,   // screen horizontal padding
  xxl: 40,  // large vertical section gaps (e.g. empty-state card padding)
};

// Real corner radii measured from the exports.
export const radius = {
  sm: 10,   // calendar day cells
  md: 18,   // Notes card
  lg: 20,   // Dashboard/Calendar cards
  xl: 24,   // bottom nav bar
  pill: 40, // CTA buttons ("VIEW BOOKS", "+ Add Reminder") — not fully round,
            // a fixed 40px radius that reads as a pill given the button height
};
