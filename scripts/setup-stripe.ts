/**
 * Run once after creating your Stripe account:
 *   npx tsx scripts/setup-stripe.ts
 *
 * Creates all products + prices and prints the price IDs
 * to paste into .env.local
 */

import Stripe from "stripe";
import * as fs from "fs";
import * as path from "path";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!SECRET_KEY || SECRET_KEY === "your_stripe_secret_key") {
  console.error(
    "\n❌  Set STRIPE_SECRET_KEY in .env.local first, then re-run.\n"
  );
  process.exit(1);
}

const stripe = new Stripe(SECRET_KEY, { apiVersion: "2025-02-24.acacia", typescript: true });

const PRODUCTS = [
  // ── Memberships ──────────────────────────────────────────────
  {
    envKey: "STRIPE_PRICE_FREQUENT_FAMILY",
    name: "Frequent Diggers Family",
    description: "Daily access for up to 3 children · 48-hr early event access · 10% off retail · 2–4 guest passes/mo",
    amount: 17900, // $179/mo
    type: "recurring" as const,
  },
  {
    envKey: "STRIPE_PRICE_WEEKDAY_FAMILY",
    name: "Weekday Diggers Family",
    description: "Weekday access for up to 3 children · 48-hr early event access · 10% off retail · 2–4 guest passes/mo",
    amount: 11900,
    type: "recurring" as const,
  },
  {
    envKey: "STRIPE_PRICE_WEEKEND_FAMILY",
    name: "Weekend Diggers Family",
    description: "Weekend access for up to 3 children · 48-hr early event access · 10% off retail",
    amount: 9900,
    type: "recurring" as const,
  },
  {
    envKey: "STRIPE_PRICE_FREQUENT_SINGLE",
    name: "Frequent Digger",
    description: "Daily access for 1 child · 48-hr early event access · 10% off retail · 2 guest passes/mo",
    amount: 10000,
    type: "recurring" as const,
  },
  {
    envKey: "STRIPE_PRICE_WEEKDAY_SINGLE",
    name: "Weekday Digger",
    description: "Weekday access for 1 child · 48-hr early event access · 10% off retail · 1 guest pass/mo",
    amount: 6000,
    type: "recurring" as const,
  },
  {
    envKey: "STRIPE_PRICE_WEEKEND_SINGLE",
    name: "Weekend Digger",
    description: "Weekend access for 1 child · 48-hr early event access · 10% off retail · 1 guest pass/mo",
    amount: 4000,
    type: "recurring" as const,
  },
  // ── Drop-in ──────────────────────────────────────────────────
  {
    envKey: "STRIPE_PRICE_DROP_IN",
    name: "Drop-In Play Session",
    description: "One 90-minute open play session at Z. Axl's Dig Yard",
    amount: 2700, // $27
    type: "one_time" as const,
  },
];

async function run() {
  console.log("\n🎪  Z. Axl's Dig Yard — Stripe Setup\n");

  const results: Record<string, string> = {};

  for (const product of PRODUCTS) {
    process.stdout.write(`Creating "${product.name}"...`);

    // Create product
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    // Create price
    const price = await stripe.prices.create({
      product: stripeProduct.id,
      currency: "usd",
      unit_amount: product.amount,
      ...(product.type === "recurring"
        ? { recurring: { interval: "month" } }
        : {}),
    });

    results[product.envKey] = price.id;
    console.log(` ✓  ${price.id}`);
  }

  // ── Print env block ──────────────────────────────────────────
  console.log("\n─────────────────────────────────────────");
  console.log("Copy these into your .env.local:\n");
  for (const [key, value] of Object.entries(results)) {
    console.log(`${key}=${value}`);
  }
  console.log("─────────────────────────────────────────\n");

  // ── Auto-patch .env.local ────────────────────────────────────
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    let env = fs.readFileSync(envPath, "utf-8");
    for (const [key, value] of Object.entries(results)) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (regex.test(env)) {
        env = env.replace(regex, `${key}=${value}`);
      } else {
        env += `\n${key}=${value}`;
      }
    }
    fs.writeFileSync(envPath, env);
    console.log("✅  .env.local updated automatically!\n");
  }

  // ── Webhook reminder ─────────────────────────────────────────
  console.log("📌  Next steps:");
  console.log("   1. Go to https://dashboard.stripe.com/webhooks");
  console.log("   2. Add endpoint: https://yourdomain.com/api/stripe/webhook");
  console.log("   3. Select events:");
  console.log("      · checkout.session.completed");
  console.log("      · customer.subscription.updated");
  console.log("      · customer.subscription.deleted");
  console.log("      · invoice.payment_failed");
  console.log("   4. Copy the Signing Secret → STRIPE_WEBHOOK_SECRET in .env.local\n");
}

run().catch((err) => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
