import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Special Events",
  description:
    "Spectacular themed events at Z. Axl's Dig Yard. Members receive 24-hour early access and 10% off every ticket.",
};

export default function SpecialEventsPage() {
  return (
    <>
      <PageHero
        tag="Special Events"
        title="Sometimes, play is pure spectacle."
        subtitle="During our special events, we intentionally set aside our 'Museum-Calm' expectations to make room for high-energy wonder."
      />

      {/* About special events */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="label-tag mb-4">The Z. Axl&apos;s Event Experience</p>
              <h2 className="heading-section mb-6">
                Vibrant, high-energy, and intentionally lively.
              </h2>
              <div className="space-y-5 body-lead">
                <p>
                  While the science of emotional literacy is the foundation of our daily
                  rhythm, our Special Events are where we let the blueprints fly out the
                  window. These sessions are designed for families to simply be together in a
                  space transformed by spectacular imagination.
                </p>
                <p>
                  Our founder has a deep-seated love for a well-executed theme. She believes
                  that every celebration should be as spectacular as it sounds — vibrant,
                  high-energy, and intentionally lively (unless otherwise noted).
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-5">
                {[
                  {
                    label: "Members First",
                    body: "Z. Axl Members receive 24-hour early access to all event bookings and a 10% discount on every ticket. Check our calendar regularly — when we theme, we theme spectacularly.",
                  },
                  {
                    label: "Separate Registration",
                    body: "Special events require a separate registration fee from your regular membership or drop-in pass.",
                  },
                  {
                    label: "What's Included",
                    body: "Pinterest-perfect décor, specialized hosts, and stress-free setup. Our events are fully produced so you can show up and simply enjoy.",
                  },
                ].map((item) => (
                  <div key={item.label} className="card-soft">
                    <p className="label-tag mb-2">{item.label}</p>
                    <p className="font-body text-sm text-warm-gray leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Upcoming Events placeholder */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">Upcoming Events</p>
            <h2 className="heading-section mb-12">What&apos;s on the calendar.</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-charcoal text-cream p-12 text-center">
              <p className="font-display text-3xl font-light mb-4">
                Events Coming Soon
              </p>
              <p className="font-body text-cream/60 mb-8 max-w-md mx-auto">
                Our first spectacular events are in the works. Become a member now to ensure
                you get 24-hour early access when they drop.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/play-options"
                  className="inline-flex items-center justify-center px-7 py-3 bg-sand text-charcoal font-body font-medium text-sm hover:bg-earth hover:text-cream transition-colors"
                >
                  Become a Member
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3 border border-cream/30 text-cream font-body font-medium text-sm hover:bg-cream/10 transition-colors"
                >
                  Get Notified
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
