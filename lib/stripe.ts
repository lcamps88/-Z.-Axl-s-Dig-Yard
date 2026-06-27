import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export type MembershipPlan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceId: string;
  interval: string;
  description: string;
  perks: string[];
  highlight?: boolean;
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "frequent-family",
    name: "Frequent Diggers Family",
    subtitle: "Up to 3 children",
    price: 179,
    priceId: process.env.STRIPE_PRICE_FREQUENT_FAMILY ?? "",
    interval: "month",
    description:
      "One 90-minute play session every day we are open, for each named child (up to 3).",
    perks: [
      "Daily access for up to 3 children",
      "2-child households: 4 guest passes/month",
      "3-child households: 2 guest passes/month",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
    highlight: true,
  },
  {
    id: "weekday-family",
    name: "Weekday Diggers Family",
    subtitle: "Up to 3 children",
    price: 119,
    priceId: process.env.STRIPE_PRICE_WEEKDAY_FAMILY ?? "",
    interval: "month",
    description:
      "One 90-minute play session every weekday we are open, for each named child (up to 3).",
    perks: [
      "Weekday access for up to 3 children",
      "2-child households: 4 guest passes/month",
      "3-child households: 2 guest passes/month",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
  },
  {
    id: "weekend-family",
    name: "Weekend Diggers Family",
    subtitle: "Up to 3 children",
    price: 99,
    priceId: process.env.STRIPE_PRICE_WEEKEND_FAMILY ?? "",
    interval: "month",
    description:
      "One 90-minute play session every Saturday & Sunday we are open, for each named child (up to 3).",
    perks: [
      "Weekend access for up to 3 children",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
  },
  {
    id: "frequent-single",
    name: "Frequent Digger",
    subtitle: "1 child",
    price: 100,
    priceId: process.env.STRIPE_PRICE_FREQUENT_SINGLE ?? "",
    interval: "month",
    description:
      "One 90-minute play session every day we are open, for one named child.",
    perks: [
      "Daily access for 1 child",
      "2 guest passes/month",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
  },
  {
    id: "weekday-single",
    name: "Weekday Digger",
    subtitle: "1 child",
    price: 60,
    priceId: process.env.STRIPE_PRICE_WEEKDAY_SINGLE ?? "",
    interval: "month",
    description:
      "One 90-minute play session every weekday we are open, for one named child.",
    perks: [
      "Weekday access for 1 child",
      "1 guest pass/month",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
  },
  {
    id: "weekend-single",
    name: "Weekend Digger",
    subtitle: "1 child",
    price: 40,
    priceId: process.env.STRIPE_PRICE_WEEKEND_SINGLE ?? "",
    interval: "month",
    description:
      "One 90-minute play session every Saturday & Sunday we are open, for one named child.",
    perks: [
      "Weekend access for 1 child",
      "1 guest pass/month",
      "48-hr early event access",
      "10% off retail",
      "Members-only support calendar",
    ],
  },
];

export const DROP_IN_PRICE_ID = process.env.STRIPE_PRICE_DROP_IN ?? "";
export const DROP_IN_PRICE = 27;
