"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Star, Bell } from "lucide-react";
import { MEMBERSHIP_PLANS, type MembershipPlan } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const STRIPE_READY =
  typeof window !== "undefined"
    ? false // evaluated below
    : false;

// Stripe is ready when the publishable key is set (not a placeholder)
function isStripeReady() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  return key.startsWith("pk_");
}

export default function MembershipCards() {
  const [loading, setLoading] = useState<string | null>(null);
  const stripeReady = isStripeReady();

  async function handleSubscribe(planId: string) {
    if (!stripeReady) {
      toast("Memberships opening soon! Drop your email below to be notified.", {
        icon: "🌱",
        duration: 4000,
      });
      return;
    }

    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const familyPlans = MEMBERSHIP_PLANS.filter((p) => p.id.includes("family"));
  const singlePlans = MEMBERSHIP_PLANS.filter((p) => !p.id.includes("family"));

  return (
    <div className="space-y-16">
      {/* Coming-soon banner when Stripe isn't configured */}
      {!stripeReady && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold-light border-2 border-gold/40 rounded-3xl p-6 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shrink-0">
            <Bell size={18} className="text-dusk" />
          </div>
          <div>
            <p className="font-display font-bold text-dusk text-sm">
              Memberships Opening Soon!
            </p>
            <p className="font-body text-xs text-dusk-soft mt-0.5">
              We&apos;re putting the finishing touches on our membership portal.
              Click any plan to get notified when we go live.
            </p>
          </div>
        </motion.div>
      )}

      <div>
        <p className="label-tag mb-6 text-center">Family Plans (up to 3 children)</p>
        <div className="grid md:grid-cols-3 gap-6">
          {familyPlans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              loading={loading}
              stripeReady={stripeReady}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="label-tag mb-6 text-center">Individual Plans (1 child)</p>
        <div className="grid md:grid-cols-3 gap-6">
          {singlePlans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              loading={loading}
              stripeReady={stripeReady}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  index,
  loading,
  stripeReady,
  onSubscribe,
}: {
  plan: MembershipPlan;
  index: number;
  loading: string | null;
  stripeReady: boolean;
  onSubscribe: (id: string) => void;
}) {
  const isLoading = loading === plan.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col rounded-3xl p-8 relative",
        plan.highlight
          ? "bg-forest text-white shadow-soft ring-4 ring-gold"
          : "bg-white shadow-card"
      )}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-gold text-dusk text-xs font-body font-bold tracking-wide uppercase px-4 py-1.5 rounded-pill shadow-soft">
            <Star size={11} className="fill-dusk" /> Most Popular
          </span>
        </div>
      )}

      <div className="mb-6 mt-2">
        <p className={cn("font-body text-xs font-bold tracking-widest uppercase mb-1", plan.highlight ? "text-gold" : "text-forest")}>
          {plan.subtitle}
        </p>
        <h3 className={cn("font-display font-bold text-xl mb-3", plan.highlight ? "text-white" : "text-dusk")}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className={cn("font-display font-bold text-4xl", plan.highlight ? "text-gold" : "text-forest")}>
            ${plan.price}
          </span>
          <span className={cn("font-body text-sm", plan.highlight ? "text-white/60" : "text-mid-gray")}>/month</span>
        </div>
      </div>

      <p className={cn("font-body text-sm leading-relaxed mb-6", plan.highlight ? "text-white/75" : "text-dusk-soft")}>
        {plan.description}
      </p>

      <ul className="space-y-2.5 flex-1 mb-8">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <div className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
              plan.highlight ? "bg-gold" : "bg-forest-light"
            )}>
              <Check size={10} className={plan.highlight ? "text-dusk" : "text-forest"} />
            </div>
            <span className={cn("font-body text-xs leading-relaxed", plan.highlight ? "text-white/85" : "text-dusk-soft")}>
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan.id)}
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3.5 rounded-pill font-body font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed",
          plan.highlight
            ? "bg-gold text-dusk hover:bg-gold-dark"
            : "bg-forest text-white hover:bg-forest-dark"
        )}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : stripeReady ? (
          "Get Started"
        ) : (
          <><Bell size={14} /> Notify Me</>
        )}
      </button>
    </motion.div>
  );
}
