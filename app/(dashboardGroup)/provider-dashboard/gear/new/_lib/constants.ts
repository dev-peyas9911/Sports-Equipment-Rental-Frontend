export const GEAR_CONDITIONS = [
  "NEW",
  "LIKE_NEW",
  "GOOD",
  "FAIR",
  "POOR",
] as const;

export type GearCondition = (typeof GEAR_CONDITIONS)[number];

export const GEAR_CONDITION_LABELS: Record<GearCondition, string> = {
  NEW: "New",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor",
};
