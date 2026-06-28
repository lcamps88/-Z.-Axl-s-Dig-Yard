import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { getEvent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { Calendar, Clock, DollarSign, Users, Lock, ArrowLeft, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function SimpleBody({ value }: { value: any[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-4">
      {value.map((block: any) => {
        if (block._type !== "block") return null;
        const text = block.children?.map((c: any) => c.text).join("") ?? "";
        if (block.style === "h2") return <h2 key={block._key} className="font-quicksand font-bold text-dusk text-xl mt-6 mb-2">{text}</h2>;
        if (block.style === "h3") return <h3 key={block._key} className="font-quicksand font-bold text-dusk text-lg mt-4 mb-1">{text}</h3>;
        return <p key={block._key} className="font-body text-dusk-soft text-base leading-relaxed">{text}</p>;
      })}
    </div>
  );
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const bookingHref = event.stripePaymentLink ?? "/contact";
  const bookLabel = event.price === 0 ? "Reserve a Spot — Free" : event.price != null ? `Book Now — $${event.price}` : "Book Now";

  return (
    <>
      <PageHero tag="Event" title={event.title} size="sm" />

      <section className="section-padding bg-mist">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/programming"
            className="inline-flex items-center gap-2 font-quicksand font-bold text-sm text-forest mb-10 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={15} /> Back to Programming
          </Link>

          <div className="bg-white rounded-3xl overflow-hidden shadow-card">
            {/* Event image */}
            {event.image?.asset && (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={urlFor(event.image).width(900).height(400).url()}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              {/* Members-only badge */}
              {event.isMembersOnly && (
                <span className="inline-flex items-center gap-1.5 bg-forest-light text-forest text-xs font-quicksand font-bold px-3 py-1.5 rounded-pill mb-5">
                  <Lock size={11} /> Members Only
                </span>
              )}

              {/* Meta */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-mist rounded-2xl px-4 py-3">
                  <Calendar size={16} className="text-forest shrink-0" />
                  <div>
                    <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-dusk-soft mb-0.5">Date</p>
                    <p className="font-quicksand font-bold text-dusk text-sm">{formatDate(event.eventDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-mist rounded-2xl px-4 py-3">
                  <Clock size={16} className="text-forest shrink-0" />
                  <div>
                    <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-dusk-soft mb-0.5">Time</p>
                    <p className="font-quicksand font-bold text-dusk text-sm">{formatTime(event.eventDate)}</p>
                  </div>
                </div>
                {event.price != null && (
                  <div className="flex items-center gap-3 bg-mist rounded-2xl px-4 py-3">
                    <DollarSign size={16} className="text-forest shrink-0" />
                    <div>
                      <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-dusk-soft mb-0.5">Price</p>
                      <p className="font-quicksand font-bold text-dusk text-sm">{event.price === 0 ? "Free" : `$${event.price} per family`}</p>
                    </div>
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-center gap-3 bg-mist rounded-2xl px-4 py-3">
                    <Users size={16} className="text-forest shrink-0" />
                    <div>
                      <p className="font-quicksand font-bold text-xs uppercase tracking-widest text-dusk-soft mb-0.5">Capacity</p>
                      <p className="font-quicksand font-bold text-dusk text-sm">Max {event.capacity} families</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Short description */}
              {event.description && (
                <p className="font-body text-dusk-soft leading-relaxed mb-6">{event.description}</p>
              )}

              {/* Full body */}
              {event.body?.length > 0 && (
                <div className="border-t border-light-gray pt-6 mb-8">
                  <SimpleBody value={event.body} />
                </div>
              )}

              {/* Booking CTA */}
              <div className="border-t border-light-gray pt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={bookingHref}
                  target={event.stripePaymentLink ? "_blank" : undefined}
                  rel={event.stripePaymentLink ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-quicksand font-bold text-white bg-forest px-8 py-3.5 rounded-pill hover:bg-forest-dark transition-colors text-sm"
                >
                  {bookLabel}
                  {event.stripePaymentLink && <ExternalLink size={14} />}
                </Link>
                <Link
                  href="/contact"
                  className="font-quicksand font-bold text-sm text-dusk-soft hover:text-dusk transition-colors"
                >
                  Have questions? Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
