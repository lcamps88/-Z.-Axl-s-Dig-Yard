import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getPosts } from "@/lib/sanity/queries";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on emotional literacy, play-based learning, and raising emotionally intelligent children from the Z. Axl's Dig Yard team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPosts(20);

  return (
    <>
      <PageHero
        tag="The Dig Yard Blog"
        title="Ideas for raising emotionally intelligent kids."
        subtitle="Research-backed insights on play, emotional literacy, and showing up for your children — from our team and our founder."
      />

      <section className="section-padding bg-mist">
        <div className="container-wide">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-quicksand text-dusk-soft text-lg">Posts coming soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, i: number) => (
                <AnimatedSection key={post._id} delay={i * 0.06}>
                  <Link href={`/blog/${post.slug.current}`} className="group block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow h-full">
                    {/* Placeholder image block */}
                    <div className="h-48 bg-gradient-to-br from-sky-mist to-forest-light flex items-center justify-center">
                      <span className="text-4xl">📖</span>
                    </div>
                    <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1.5 text-dusk-soft text-xs font-quicksand mb-3">
                          <Calendar size={12} />
                          {formatDate(post.publishedAt)}
                        </div>
                      )}
                      <h2 className="font-quicksand font-bold text-dusk text-lg leading-snug mb-3 group-hover:text-forest transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="font-body text-sm text-dusk-soft leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-forest font-quicksand font-bold text-sm mt-4">
                        Read more <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
