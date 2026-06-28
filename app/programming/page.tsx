import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { getEvents } from "@/lib/sanity/queries";
import { Calendar, DollarSign, Users, Lock, BookOpen, Users as UsersIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Programming",
  description: "Upcoming events, developmental classes, and caregiver workshops at Z. Axl's Dig Yard.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default async function ProgrammingPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        tag="Programming"
        title="Structured play with space for spontaneity."
        subtitle="Our calendar offers intentional sessions, special events, and caregiver workshops — all rooted in emotional literacy."
      />

      {/* Upcoming calendar */}
      <section id="calendar" className="section-padding bg-mist">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-forest-light rounded-2xl flex items-center justify-center">
                <Calendar size={22} className="text-forest" />
              </div>
              <div>
                <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-forest mb-0.5">Monthly Calendar</p>
                <h2 className="font-quicksand font-bold text-2xl text-dusk">What&apos;s happening at The Yard.</h2>
              </div>
            </div>
          </AnimatedSection>

          {events.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-3xl p-10 text-center shadow-card max-w-lg mx-auto">
                <p className="font-quicksand font-bold text-dusk text-xl mb-3">Calendar Coming Soon</p>
                <p className="font-body text-dusk-soft text-sm mb-6">Members receive 48-hour early access to all session bookings.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/play-options" className="btn-primary text-sm">Become a Member</Link>
                  <Link href="/contact" className="btn-secondary text-sm">Join the Waitlist</Link>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-4">
              {events.map((event: any, i: number) => (
                <AnimatedSection key={event._id} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow flex flex-col sm:flex-row sm:items-center gap-5">
                    {/* Date badge */}
                    <div className="bg-forest-light rounded-2xl px-5 py-3 text-center shrink-0 min-w-[80px]">
                      <p className="font-quicksand font-bold text-forest text-lg leading-none">
                        {new Date(event.eventDate).getDate()}
                      </p>
                      <p className="font-quicksand text-xs text-forest/70 uppercase tracking-wide">
                        {new Date(event.eventDate).toLocaleString("en-US", { month: "short" })}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link href={`/programming/${event.slug?.current}`} className="font-quicksand font-bold text-dusk hover:text-forest transition-colors">
                          {event.title}
                        </Link>
                        {event.isMembersOnly && (
                          <span className="flex items-center gap-1 bg-forest-light text-forest text-xs font-quicksand font-bold px-2 py-0.5 rounded-pill">
                            <Lock size={9} /> Members only
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs font-quicksand text-dusk-soft">
                        <span>{formatDate(event.eventDate)} · {formatTime(event.eventDate)}</span>
                        {event.price != null && <span>{event.price === 0 ? "Free" : `$${event.price}`}</span>}
                        {event.capacity && <span>Max {event.capacity} families</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/programming/${event.slug?.current}`}
                        className="font-quicksand font-bold text-sm text-forest border border-forest px-4 py-2 rounded-pill hover:bg-forest-light transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={event.stripePaymentLink ?? "/contact"}
                        target={event.stripePaymentLink ? "_blank" : undefined}
                        rel={event.stripePaymentLink ? "noopener noreferrer" : undefined}
                        className="font-quicksand font-bold text-sm text-white bg-forest px-4 py-2 rounded-pill hover:bg-forest-dark transition-colors"
                      >
                        {event.price === 0 ? "Register Free" : "Book"}
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Developmental Classes */}
      <section id="classes" className="section-padding bg-white">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gold-light rounded-2xl flex items-center justify-center">
                <BookOpen size={22} className="text-gold-dark" />
              </div>
              <div>
                <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-gold-dark mb-0.5">Developmental Classes</p>
                <h2 className="font-quicksand font-bold text-2xl text-dusk">Age-specific workshops for little builders.</h2>
              </div>
            </div>
            <p className="font-body text-dusk-soft max-w-2xl mb-6">
              Our developmental classes are age-specific workshops rooted in the CASEL framework. Each class meets children where they are developmentally and gives caregivers co-regulation tools to use at home.
            </p>
            <span className="inline-flex items-center gap-2 bg-gold-light text-gold-dark font-quicksand font-bold text-sm px-5 py-2.5 rounded-pill">
              Schedule dropping soon — <Link href="/contact" className="underline">get notified</Link>
            </span>
          </AnimatedSection>
        </div>
      </section>

      {/* Caregiver Workshops */}
      <section id="workshops" className="section-padding bg-dusk">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <UsersIcon size={22} className="text-nav-gold" />
              </div>
              <div>
                <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-nav-gold mb-0.5">Caregiver Workshops</p>
                <h2 className="font-quicksand font-bold text-2xl text-white">Supporting the &ldquo;Site Supervisors.&rdquo;</h2>
              </div>
            </div>
            <p className="font-body text-white/70 max-w-2xl mb-6">
              Monthly evening workshops for parents — because co-regulation starts with you. These sessions give you the language, the science, and the confidence to be your child&apos;s emotional anchor.
            </p>
            <Link href="/contact" className="inline-flex items-center font-quicksand font-bold text-sm text-dusk bg-nav-gold px-6 py-3 rounded-pill hover:opacity-85 transition-opacity">
              Join the waitlist
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Member CTA */}
      <div className="bg-forest-light py-10 px-6">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-forest mb-1">Member Benefit</p>
            <h3 className="font-quicksand font-bold text-xl text-dusk">Members get 48-hour early booking access to all programming.</h3>
          </div>
          <Link href="/play-options" className="shrink-0 btn-primary">View Memberships</Link>
        </div>
      </div>
    </>
  );
}
