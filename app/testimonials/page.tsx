import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getTestimonials } from "@/lib/sanity/queries";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "What Families Are Saying",
  description: "Real stories from the families who play, celebrate, and grow at Z. Axl's Dig Yard.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        tag="Testimonials"
        title="What families are saying."
        subtitle="The proof is in the hugs at the door. Read what families who've dug in have to say."
      />

      <section className="section-padding bg-mist">
        <div className="container-wide">
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-quicksand text-dusk-soft text-lg">Testimonials coming soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: any, i: number) => (
                <AnimatedSection key={t._id} delay={i * 0.06}>
                  <div className="bg-white rounded-3xl p-7 shadow-card flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating ?? 5 }).map((_, s) => (
                        <Star key={s} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="font-body text-dusk-soft text-sm leading-relaxed flex-1 mb-5 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    {/* Attribution */}
                    <div className="pt-4 border-t border-light-gray">
                      <p className="font-quicksand font-bold text-dusk text-sm">{t.name}</p>
                      {t.childAge && (
                        <p className="font-quicksand text-xs text-dusk-soft mt-0.5">Child age: {t.childAge}</p>
                      )}
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
