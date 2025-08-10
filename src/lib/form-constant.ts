// lib/form-constants.ts
export const REGIONS = ["Bagan", "Mandalay", "Hpa An"] as const;

export const HISTORICAL_INTERESTS = [
  "Pagan Empire",
  // "Ancient Monuments",
  "Buddhist Art",
] as const;

// export const FESTIVALS = ["Thingyan", "Tazaungdaing", "Phaya Ngai"] as const;
export const ACTIVITIES = ["Hot air balloon", "Cycling", "Hiking"] as const;
// export const TRANSPORT_OPTIONS = [
//   "Private car",
//   "Bus",
//   "Train",
//   "Boat",
// ] as const;
export const CULTURAL_EXPERIENCES = [
  "Monk blessing",
  "Traditional crafts",
  "Local markets",
] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const DURATION_OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1} Day${i > 0 ? "s" : ""}`,
}));

export const PACE_OPTIONS = [
  {
    value: "slow",
    label: "Leisurely",
    description: "1-2 sites/day",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "3-4 sites/day",
  },
  {
    value: "fast",
    label: "Fast-paced",
    description: "5+ sites/day",
  },
];

export const SITE_PREFERENCE_OPTIONS = [
  {
    value: "iconic",
    label: "Iconic Sites",
    description: "Must-see landmarks",
  },
  {
    value: "hidden",
    label: "Hidden Gems",
    description: "Lesser-known ruins",
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "Best of both",
  },
];

export const BUDGET_OPTIONS = [
  {
    value: "budget",
    label: "Budget",
    description: "$30-50/day",
  },
  {
    value: "mid-range",
    label: "Mid-Range",
    description: "$50-100/day",
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "$100+/day",
  },
];

export const ACCOMMODATION_OPTIONS = [
  {
    value: "near sites",
    label: "Near Sites",
    description: "Convenient location",
  },
  {
    value: "city center",
    label: "City Center",
    description: "More dining options",
  },
  {
    value: "unique stays",
    label: "Unique Stays",
    description: "Boutique/Heritage",
  },
];

export const MOBILITY_OPTIONS = [
  {
    value: "none",
    label: "None",
    description: "No limitations",
  },
  {
    value: "some",
    label: "Some",
    description: "Limited mobility",
  },
  {
    value: "wheelchair",
    label: "Wheelchair",
    description: "Accessible routes",
  },
];

export const EXPLORATION_STYLE_OPTIONS = [
  {
    value: "guided",
    label: "Guided Tours",
    description: "With expert guides",
  },
  {
    value: "independent",
    label: "Independent",
    description: "Explore on your own",
  },
  {
    value: "mixed",
    label: "Mixed",
    description: "Some of both",
  },
];
