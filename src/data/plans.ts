export interface Plan {
  id: string;
  name: string;
  tagline: string;
  cover: string;
  price: number;
  period: "year" | "month";
  rewardCoins: number;
  highlights: string[];
  badge?: "Popular" | "Best value" | "New";
  accent: "blue" | "teal" | "violet" | "amber";
}

export const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Essential Care",
    tagline: "Cover the basics for one",
    cover: "₹3 Lakh cover",
    price: 999,
    period: "year",
    rewardCoins: 75,
    highlights: ["Hospitalisation", "Day-care 50+", "Free annual check-up"],
    accent: "blue",
  },
  {
    id: "family-shield",
    name: "Family Shield",
    tagline: "Spouse + 2 kids",
    cover: "₹10 Lakh family floater",
    price: 4999,
    period: "year",
    rewardCoins: 300,
    highlights: ["Maternity rider", "OPD up to ₹15k", "PED in 2 yrs"],
    badge: "Popular",
    accent: "violet",
  },
  {
    id: "senior-care",
    name: "Senior Care",
    tagline: "60+ tailored protection",
    cover: "₹7.5 Lakh cover",
    price: 6499,
    period: "year",
    rewardCoins: 250,
    highlights: ["No upper age limit", "Pre-existing day 91", "Home-care covered"],
    accent: "amber",
  },
  {
    id: "critical-illness",
    name: "Critical Illness",
    tagline: "Lump-sum payout on diagnosis",
    cover: "₹25 Lakh cover",
    price: 2499,
    period: "year",
    rewardCoins: 175,
    highlights: ["38 illnesses", "Tax-saving u/s 80D", "Survival period 30d"],
    accent: "teal",
  },
  {
    id: "wellness-plus",
    name: "Wellness Plus",
    tagline: "OPD-first plan for young India",
    cover: "₹5 Lakh + OPD wallet",
    price: 1799,
    period: "year",
    rewardCoins: 125,
    highlights: ["Unlimited tele-consults", "Lab tests 50% off", "Mental wellness"],
    badge: "New",
    accent: "blue",
  },
  {
    id: "max-secure",
    name: "Max Secure",
    tagline: "Highest cover, zero co-pay",
    cover: "₹50 Lakh cover",
    price: 11999,
    period: "year",
    rewardCoins: 600,
    highlights: ["Restoration benefit", "Air ambulance", "Worldwide emergency"],
    badge: "Best value",
    accent: "violet",
  },
];
