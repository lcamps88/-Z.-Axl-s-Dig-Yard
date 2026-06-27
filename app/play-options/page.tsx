import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MembershipCards from "@/components/MembershipCards";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Play Options & Memberships",
  description:
    "Membership tiers, drop-in sessions, and birthday packages at Z. Axl's Dig Yard. Starting at $27 per session.",
};

const MEMBER_PERKS = [
  "Predictable access to our calm, sensory-smart environment",
  "48-hour early booking access for special events and seasonal programs",
  "10% off in our retail shop",
  "Members-only Support Calendar: workshops, parent resources, and community touchpoints",
  "Guest passes included with qualifying tiers",
  "Discounts on birthday party packages",
];

export default function PlayOptionsPage() {
  return (
    <>
      <PageHero
        tag="Play Options & Memberships"
        title="A home base for your family's play life."
        subtitle="Whether you're a daily visitor or an occasional explorer, we have a plan designed for your family's rhythm."
      />

      {/* About Membership */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="label-tag mb-4">About Membership</p>
              <h2 className="heading-section mb-6">
                Designed for families who want a calmer, more intentional play rhythm.
              </h2>
              <p className="body-lead mb-6">
                Membership at Z. Axl&apos;s Dig Yard is for families who want predictable
                access to a warm, sensory-smart environment built specifically for children
                18 months through age 7 — along with thoughtful perks that make visits
                easier, smoother, and more meaningful.
              </p>
              <p className="body-lead">
                Our members get a home base: a place where little builders can return again
                and again to explore at their own pace, practice emotional skills through
                play, and feel confident in a space designed just for them.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-cream-dark p-10">
                <p className="label-tag mb-6 text-earth">Membership Perks</p>
                <ul className="space-y-3">
                  {MEMBER_PERKS.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check size={15} className="text-earth shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-warm-gray leading-relaxed">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Membership Plans</p>
            <h2 className="heading-section mb-4">
              Choose the plan that fits your family&apos;s schedule.
            </h2>
            <p className="body-lead mb-12 max-w-2xl">
              All memberships are billed monthly and can be cancelled at any time. Each named
              child receives one 90-minute session per eligible day. Sessions may be used
              concurrently or scheduled individually based on site availability.
            </p>
          </AnimatedSection>
          <MembershipCards />
        </div>
      </section>

      {/* Drop-In */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center border border-light-gray p-10">
              <div>
                <p className="label-tag mb-3">Drop-In Diggers</p>
                <h2 className="font-display text-3xl font-light text-charcoal mb-4">
                  Flexible, pay-as-you-go play.
                </h2>
                <p className="font-body text-warm-gray leading-relaxed mb-2">
                  No commitment required. A single 90-minute play session for one child —
                  perfect for families who want to experience The Yard before committing to a
                  membership.
                </p>
                <p className="font-display text-4xl font-light text-earth mt-6">$27</p>
                <p className="font-body text-xs text-warm-gray">per child, per session</p>
              </div>
              <div className="space-y-4">
                <div className="bg-sand-light p-6">
                  <p className="font-body text-sm text-warm-gray leading-relaxed mb-4">
                    Drop-in sessions are subject to availability. To guarantee your spot and
                    maintain our regulated environment, booking in advance is strongly
                    encouraged.
                  </p>
                  <Link href="/contact" className="btn-primary text-sm">
                    Book a Session
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Birthday teaser */}
      <section className="py-16 px-6 md:px-12 bg-charcoal">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="label-tag mb-2 text-sand">Celebrations</p>
                <h3 className="font-display text-2xl font-light text-cream">
                  Birthday parties starting at $450.
                </h3>
                <p className="font-body text-cream/60 text-sm mt-2">
                  Members receive a discount on all party packages.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link
                  href="/celebrations/birthdays"
                  className="inline-flex items-center justify-center px-7 py-3 bg-sand text-charcoal font-body font-medium text-sm hover:bg-earth hover:text-cream transition-colors"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
