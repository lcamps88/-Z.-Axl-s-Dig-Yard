import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { getEvents } from "@/lib/sanity/queries";
import { createClient } from "@/lib/supabase/server";
import { Calendar, DollarSign, Users, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Special Events",
  description: "Spectacular themed events at Z. Axl's Dig Yard. Members receive 24-hour early access and 10% off every ticket.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default async function SpecialEventsPage() {
  const [events, supabase] = await Promise.all([getEvents(), createClient()]);
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <>
      <PageHero
        tag="Special Events"
        title="Sometimes, play is pure spectacle."
        subtitle="During our special events, we set aside our 'Museum-Calm' expectations to make room for high-energy wonder."
      />

      {/* Member perks banner */}
      <div className="bg-forest text-white py-4 px-6 text-center">
        <p className="font-quicksand font-bold text-sm">
          Members get 24-hour early access + 10% off every ticket.{" "}
          <Link href="/play-options" className="underline hover:no-underline ml-1">Become a member →</Link>
        </p>
      </div>

      <section className="section-padding bg-mist">
        <div className="container-wide">
          <AnimatedSection>
            <h2 className="font-quicksand font-bold text-3xl text-dusk mb-10">Upcoming Events</h2>
          </AnimatedSection>

          {events.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <div className="bg-dusk text-white rounded-3xl p-12 text-center max-w-2xl mx-auto">
                <p className="font-quicksand font-bold text-2xl mb-4">Events Coming Soon</p>
                <p className="font-body text-white/70 mb-8">
                  Our first spectacular events are in the works. Become a member now to get 24-hour early access when they drop.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/play-options" className="inline-flex items-center px-7 py-3 bg-nav-gold text-nav-text font-quicksand font-bold text-sm rounded-pill hover:opacity-85 transition-opacity">
                    Become a Member
                  </Link>
                  <Link href="/contact" className="inline-flex items-center px-7 py-3 border border-white/30 text-white font-quicksand font-bold text-sm rounded-pill hover:bg-white/10 transition-colors">
                    Get Notified
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event: any, i: number) => (
                <AnimatedSection key={event._id} delay={i * 0.08}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                    {/* Color banner */}
                    <div className="h-3 bg-gradient-to-r from-nav-gold to-forest" />
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-quicksand font-bold text-dusk text-xl leading-snug">{event.title}</h3>
                        {event.isMembersOnly && (
                          <span className="flex items-center gap-1 bg-forest-light text-forest text-xs font-quicksand font-bold px-3 py-1 rounded-pill shrink-0">
                            <Lock size={10} /> Members
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-dusk-soft text-sm font-quicksand">
                          <Calendar size={14} className="text-forest shrink-0" />
                          {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                        </div>
                        {event.price != null && (
                          <div className="flex items-center gap-2 text-dusk-soft text-sm font-quicksand">
                            <DollarSign size={14} className="text-forest shrink-0" />
                            {event.price === 0 ? "Free" : `$${event.price} per family`}
                          </div>
                        )}
                        {event.capacity && (
                          <div className="flex items-center gap-2 text-dusk-soft text-sm font-quicksand">
                            <Users size={14} className="text-forest shrink-0" />
                            Limited to {event.capacity} families
                          </div>
                        )}
                      </div>

                      {event.description && (
                        <p className="font-body text-sm text-dusk-soft leading-relaxed mb-6">{event.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/programming/${event.slug?.current}`}
                          className="inline-flex items-center font-quicksand font-bold text-sm text-forest border border-forest px-6 py-2.5 rounded-pill hover:bg-forest-light transition-colors"
                        >
                          View Details
                        </Link>
                        {event.isMembersOnly && !isLoggedIn ? (
                          <Link
                            href="/play-options"
                            className="inline-flex items-center gap-1.5 font-quicksand font-bold text-sm text-forest bg-forest-light px-6 py-2.5 rounded-pill"
                          >
                            <Lock size={13} /> Members Only
                          </Link>
                        ) : (
                          <Link
                            href={event.stripePaymentLink ?? `/contact?type=Special+Events&event=${encodeURIComponent(event.title)}`}
                            target={event.stripePaymentLink ? "_blank" : undefined}
                            rel={event.stripePaymentLink ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center font-quicksand font-bold text-sm text-white bg-forest px-6 py-2.5 rounded-pill hover:bg-forest-dark transition-colors"
                          >
                            {event.price === 0 ? "Book Now — Free" : event.price != null ? `Book Now — $${event.price}` : "Book Now"}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
