import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Calendar, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Programming",
  description:
    "Monthly calendar, developmental classes, and caregiver workshops at Z. Axl's Dig Yard.",
};

export default function ProgrammingPage() {
  return (
    <>
      <PageHero
        tag="Programming"
        title="Structured play with space for spontaneity."
        subtitle="Our programming calendar offers intentional sessions, age-specific classes, and caregiver workshops — all rooted in the science of emotional literacy."
      />

      {/* Monthly Calendar */}
      <section id="calendar" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-start gap-5 mb-12">
              <div className="w-12 h-12 bg-sand-light flex items-center justify-center shrink-0">
                <Calendar size={22} className="text-earth" />
              </div>
              <div>
                <p className="label-tag mb-2">Monthly Calendar</p>
                <h2 className="heading-section">What&apos;s happening at The Yard.</h2>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-cream-dark border border-light-gray p-12 text-center">
              <p className="font-display text-2xl font-light text-charcoal mb-4">
                Calendar Coming Soon
              </p>
              <p className="font-body text-warm-gray mb-8">
                Our interactive booking calendar will be available here. Members receive
                48-hour early access to all session bookings.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/play-options" className="btn-primary">
                  Become a Member
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Developmental Classes */}
      <section id="classes" className="section-padding bg-cream-dark scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-start gap-5 mb-8">
              <div className="w-12 h-12 bg-sand-light flex items-center justify-center shrink-0">
                <BookOpen size={22} className="text-earth" />
              </div>
              <div>
                <p className="label-tag mb-2">Developmental Classes</p>
                <h2 className="heading-section">Age-specific workshops for little builders.</h2>
              </div>
            </div>
            <p className="body-lead max-w-2xl mb-8">
              Our developmental classes are age-specific workshops designed around the
              CASEL framework. Each class meets children exactly where they are developmentally
              and gives caregivers concrete co-regulation tools to use at home.
            </p>
            <div className="inline-flex items-center gap-3 bg-sand-light px-6 py-3">
              <span className="font-body text-sm text-earth font-medium">Details coming soon</span>
              <span className="font-body text-xs text-warm-gray">— Join our list to be notified</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Caregiver Workshops */}
      <section id="workshops" className="section-padding bg-charcoal scroll-mt-20">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-start gap-5 mb-8">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                <Users size={22} className="text-sand" />
              </div>
              <div>
                <p className="label-tag mb-2 text-sand">Caregiver Workshops</p>
                <h2 className="heading-section text-cream">
                  Supporting the &ldquo;Site Supervisors.&rdquo;
                </h2>
              </div>
            </div>
            <p className="font-body text-lg text-cream/70 leading-relaxed max-w-2xl mb-8">
              Our caregiver workshops are focused on co-regulation tools for parents — because
              supporting caregivers is just as important as supporting kids. These sessions give
              you the language, the science, and the confidence to be the emotional anchor your
              child needs.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3">
              <span className="font-body text-sm text-sand font-medium">
                Sessions focused on co-regulation tools for parents — coming soon
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Member early access note */}
      <section className="py-16 px-6 md:px-12 bg-sand-light">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="label-tag mb-2">Member Benefit</p>
                <h3 className="font-display text-2xl font-light text-charcoal">
                  Members get 48-hour early booking access to all programming.
                </h3>
              </div>
              <Link href="/play-options" className="btn-primary shrink-0">
                View Memberships
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
