import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getGalleryImages } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A peek inside Z. Axl's Dig Yard — our indoor sandbox, art studio, birthday celebrations, and more.",
};

const CATEGORY_LABELS: Record<string, string> = {
  yard: "The Yard",
  birthdays: "Birthday Parties",
  events: "Events",
  art: "Art Studio",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  const grouped = images.reduce((acc: Record<string, any[]>, img: any) => {
    const cat = img.category ?? "yard";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        tag="Gallery"
        title="A peek inside the Dig Yard."
        subtitle="Every corner of our space is intentional. See it for yourself."
      />

      <section className="section-padding bg-mist">
        <div className="container-wide space-y-16">
          {(Object.entries(grouped) as [string, any[]][]).map(([cat, items], gi) => (
            <AnimatedSection key={cat} delay={gi * 0.08}>
              <h2 className="font-quicksand font-bold text-2xl text-dusk mb-6 pb-3 border-b border-light-gray">
                {CATEGORY_LABELS[cat] ?? cat}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((img: any, i: number) => (
                  <div key={img._id} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-sky-mist to-forest-light shadow-card">
                    {img.image?.asset ? (
                      <Image
                        src={urlFor(img.image).width(400).height(400).url()}
                        alt={img.caption ?? img.title ?? "Gallery image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-3xl mb-2">🏖️</span>
                        <p className="font-quicksand font-bold text-xs text-dusk-soft">{img.title}</p>
                      </div>
                    )}
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dusk/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-quicksand text-white text-xs">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}

          {images.length === 0 && (
            <div className="text-center py-20">
              <p className="font-quicksand text-dusk-soft text-lg">Photos coming soon — check back after our grand opening!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
