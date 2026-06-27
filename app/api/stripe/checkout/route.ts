export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { stripe, MEMBERSHIP_PLANS, DROP_IN_PRICE_ID, DROP_IN_PRICE } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { planId } = await request.json();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3032";

  // ── Drop-in session (one-time payment) ──────────────────────
  if (planId === "drop-in") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: DROP_IN_PRICE * 100,
              product_data: {
                name: "Drop-In Play Session",
                description: "One 90-minute open play session at Z. Axl's Dig Yard",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/plan-your-visit?booked=true`,
        cancel_url: `${siteUrl}/plan-your-visit`,
        customer_email: user?.email ?? undefined,
        metadata: { userId: user?.id ?? "", planId: "drop-in" },
      });
      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error("Stripe drop-in error:", err);
      return NextResponse.json({ error: "Payment setup failed" }, { status: 500 });
    }
  }

  // ── Membership subscription ──────────────────────────────────
  const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (!plan.priceId) {
    return NextResponse.json(
      { error: "Stripe not configured yet — please check back soon!" },
      { status: 503 }
    );
  }

  // Check for existing Stripe customer to avoid duplicates
  let customerId: string | undefined;
  if (user) {
    const { data: membership } = await supabase
      .from("memberships")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();
    customerId = membership?.stripe_customer_id ?? undefined;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${siteUrl}/portal?success=true`,
      cancel_url: `${siteUrl}/play-options`,
      ...(customerId
        ? { customer: customerId }
        : { customer_email: user?.email ?? undefined }),
      allow_promotion_codes: true,
      metadata: {
        userId: user?.id ?? "",
        planId: plan.id,
        planName: plan.name,
      },
      subscription_data: {
        metadata: {
          userId: user?.id ?? "",
          planId: plan.id,
          planName: plan.name,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Payment setup failed" }, { status: 500 });
  }
}
