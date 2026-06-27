import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Boutique Birthdays",
  description:
    "All-inclusive, high-end birthday party packages at Z. Axl's Dig Yard. Starting at $450.",
};

const INCLUDED = [
  "Private 90-minute party experience",
  "Our 5,000 sq ft facility (exclusive use during your session)",
  "Guided play facilitated by our Dig Yard team",
  "Construction-themed paper products (plates, napkins, cups)",
  "Dig Socks for all child guests",
  "Dedicated party support throughout",
  "Proprietary Connection Cues for caregivers",
  "Staff certified in adult & pediatric CPR and first aid",
];

export default function BirthdaysPage() {
  return (
    <>
      <PageHero
        tag="Boutique Birthdays"
        title="Unforgettable for kids. Easy for parents."
        subtitle="A customizable, high-energy celebration that gives families a private 90-minute party experience — guided play, themed activities, and dedicated support. Starting at $450."
      />

      {/* Package overview */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="label-tag mb-4">What&apos;s Included</p>
              <h2 className="heading-section mb-8">
                We handle the details. You handle the joy.
              </h2>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="text-earth mt-0.5 shrink-0" />
                    <span className="font-body text-warm-gray text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-sand-light p-10">
                <p className="label-tag mb-4 text-earth">Party Packages</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-display text-2xl font-medium text-charcoal">
                        The Dig Yard Party
                      </h3>
                      <span className="font-display text-2xl text-earth">$450+</span>
                    </div>
                    <p className="font-body text-sm text-warm-gray leading-relaxed">
                      Our signature private party experience for up to 10 children. Includes
                      90 minutes of exclusive facility access, guided play, and all the
                      essentials to make the day spectacular.
                    </p>
                  </div>
                  <div className="border-t border-sand pt-6">
                    <p className="font-body text-xs text-warm-gray mb-2">Add-ons available:</p>
                    <ul className="space-y-1">
                      {[
                        "Additional children (per CT state guidelines, includes second facilitator)",
                        "Custom themed décor packages",
                        "Extended time (based on availability)",
                      ].map((addon) => (
                        <li
                          key={addon}
                          className="font-body text-xs text-warm-gray pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-sand"
                        >
                          {addon}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-charcoal p-8 text-cream">
                <p className="label-tag mb-2 text-sand">Member Discount</p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Z. Axl Members receive a discount on birthday party packages. Becoming a
                  member is the best way to make your family&apos;s celebrations more
                  affordable.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Rules summary */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <AnimatedSection>
            <p className="label-tag mb-4">The Z. Axl&apos;s Standard</p>
            <h2 className="heading-section mb-4 max-w-2xl">
              A few site protocols to keep the experience exceptional for everyone.
            </h2>
            <p className="body-lead mb-12">
              Full details in our{" "}
              <Link href="/celebrations/birthday-faqs" className="text-earth hover:underline">
                Birthday FAQs
              </Link>
              .
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Nut-Free Facility",
                body: "We are strictly nut-free. All food brought in must comply with this policy.",
              },
              {
                title: "Socks Required",
                body: "All children must wear our grip socks. Adult socks are fine, or available at the front desk.",
              },
              {
                title: "Arrive No Earlier Than 15 Min",
                body: "Please arrive no more than 15 minutes before your scheduled time to maximize guided play.",
              },
              {
                title: "No Confetti or Glitter",
                body: "No confetti, glitter, streamers, piñatas, or balloons filled with confetti/glitter are permitted.",
              },
            ].map((rule, i) => (
              <AnimatedSection key={rule.title} delay={i * 0.1}>
                <div className="card-soft h-full">
                  <h3 className="font-display text-base font-medium text-charcoal mb-2">
                    {rule.title}
                  </h3>
                  <p className="font-body text-xs text-warm-gray leading-relaxed">{rule.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-padding bg-earth text-cream">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="heading-section text-cream mb-6">
              Ready to book your dig yard celebration?
            </h2>
            <p className="font-body text-cream/70 mb-8">
              All party details are confirmed in advance. Our team is here to make the process
              seamless so you can focus on the memories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-cream text-charcoal font-body font-medium text-sm hover:bg-sand-light transition-colors"
              >
                Inquire About a Party
              </Link>
              <Link
                href="/celebrations/birthday-faqs"
                className="inline-flex items-center justify-center px-7 py-3 border border-cream/40 text-cream font-body font-medium text-sm hover:bg-cream/10 transition-colors"
              >
                Read the FAQs
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
