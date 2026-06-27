"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut, Calendar, Star, Gift, BookOpen, Users } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Membership {
  id: string;
  plan_name: string;
  status: string;
  stripe_subscription_id: string;
  current_period_end: string;
  children_count: number;
}

interface PortalClientProps {
  user: User;
  membership: Membership | null;
}

export default function PortalClient({ user, membership }: PortalClientProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const isMember = membership?.status === "active";
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Member";

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleManageBilling() {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="min-h-screen bg-cream-dark pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="label-tag mb-2">Member Portal</p>
              <h1 className="font-display text-4xl font-light text-charcoal">
                Welcome back, {displayName}.
              </h1>
            </div>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex items-center gap-2 text-sm font-body text-warm-gray hover:text-charcoal transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </AnimatedSection>

        {/* Membership Status */}
        <AnimatedSection delay={0.1}>
          <div className={`p-8 mb-8 ${isMember ? "bg-earth text-cream" : "bg-white border border-light-gray"}`}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className={`label-tag mb-2 ${isMember ? "text-sand" : "text-earth"}`}>
                  {isMember ? "Active Membership" : "No Active Membership"}
                </p>
                <h2 className={`font-display text-2xl font-light ${isMember ? "text-cream" : "text-charcoal"}`}>
                  {isMember ? membership.plan_name : "Become a Member"}
                </h2>
                {isMember && membership.current_period_end && (
                  <p className="font-body text-sm text-cream/70 mt-1">
                    Renews {new Date(membership.current_period_end).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              {isMember ? (
                <button
                  onClick={handleManageBilling}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-cream text-charcoal font-body text-sm font-medium hover:bg-sand-light transition-colors"
                >
                  Manage Billing
                </button>
              ) : (
                <Link href="/play-options" className="btn-primary">
                  View Plans
                </Link>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Portal Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Calendar,
              title: "Book a Session",
              body: isMember
                ? "You have 48-hour early access to all sessions and events."
                : "Members get priority booking access.",
              href: "/programming#calendar",
              available: true,
            },
            {
              icon: Star,
              title: "Special Events",
              body: isMember
                ? "Early access is active. Members get 10% off every event ticket."
                : "Become a member for 24-hour early access to all events.",
              href: "/celebrations/special-events",
              available: true,
            },
            {
              icon: Gift,
              title: "Member Discounts",
              body: "10% off retail items and discounts on birthday party packages.",
              href: "/play-options",
              available: isMember,
            },
            {
              icon: BookOpen,
              title: "Support Calendar",
              body: "Access our members-only rotating collection of workshops, parent resources, and community touchpoints.",
              href: "#",
              available: isMember,
              comingSoon: true,
            },
            {
              icon: Users,
              title: "Caregiver Workshops",
              body: "Exclusive access to sessions focused on co-regulation tools and emotional literacy for caregivers.",
              href: "/programming#workshops",
              available: isMember,
            },
            {
              icon: Calendar,
              title: "Classes",
              body: "Age-specific developmental workshops available for members with priority registration.",
              href: "/programming#classes",
              available: isMember,
              comingSoon: true,
            },
          ].map((section, i) => (
            <AnimatedSection key={section.title} delay={0.15 + i * 0.07}>
              <Link
                href={section.available ? section.href : "/play-options"}
                className={`block card-soft h-full group transition-all ${
                  !section.available ? "opacity-60 cursor-default" : "hover:border-sand"
                }`}
              >
                <div className="w-10 h-10 bg-sand-light flex items-center justify-center mb-4 group-hover:bg-sand/30 transition-colors">
                  <section.icon size={18} className="text-earth" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-medium text-charcoal">
                    {section.title}
                  </h3>
                  {section.comingSoon && (
                    <span className="shrink-0 text-[10px] font-body font-medium tracking-widest uppercase bg-cream-dark text-warm-gray px-2 py-0.5">
                      Soon
                    </span>
                  )}
                  {!section.available && (
                    <span className="shrink-0 text-[10px] font-body font-medium tracking-widest uppercase bg-sand-light text-earth px-2 py-0.5">
                      Members Only
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-warm-gray leading-relaxed">{section.body}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Account Info */}
        <AnimatedSection delay={0.5}>
          <div className="mt-12 border-t border-light-gray pt-8">
            <p className="font-body text-xs text-warm-gray">
              Signed in as{" "}
              <span className="text-charcoal font-medium">{user.email}</span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
