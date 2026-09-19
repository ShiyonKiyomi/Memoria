// src/theme/index.js
// Single import point so screens do: import { theme } from "../../theme";

import { colors } from "./colors";
import { spacing, radius } from "./spacing";
import { fontSizes, fontWeights, fontFamilies } from "./typography";

export const theme = {
  colors,
  spacing,
  radius,
  fontSizes,
  fontWeights,
  fontFamilies,
};

// Named exports too, in case a screen only needs one piece
export { colors, spacing, radius, fontSizes, fontWeights, fontFamilies };
