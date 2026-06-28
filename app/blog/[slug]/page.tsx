import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { getPost } from "@/lib/sanity/queries";
import { ArrowLeft, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function SimpleBody({ value }: { value: any[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-5">
      {value.map((block: any) => {
        if (block._type !== "block") return null;
        const text = block.children?.map((c: any) => c.text).join("") ?? "";
        if (block.style === "h2") return <h2 key={block._key} className="font-quicksand font-bold text-dusk text-2xl mt-8 mb-3">{text}</h2>;
        if (block.style === "h3") return <h3 key={block._key} className="font-quicksand font-bold text-dusk text-xl mt-6 mb-2">{text}</h3>;
        return <p key={block._key} className="font-body text-dusk-soft text-base leading-relaxed">{text}</p>;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHero tag="Blog" title={post.title} subtitle={post.author?.name ? `By ${post.author.name}` : ""} size="md" />

      <section className="section-padding bg-mist">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 font-quicksand font-bold text-sm text-forest mb-10 hover:opacity-70 transition-opacity">
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-dusk-soft text-sm font-quicksand mb-8">
              <Calendar size={14} /> {formatDate(post.publishedAt)}
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card">
            <SimpleBody value={post.body} />
          </div>

          <div className="mt-12 pt-8 border-t border-light-gray flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {post.author?.name && (
              <p className="font-quicksand text-sm text-dusk-soft">
                Written by <span className="font-bold text-dusk">{post.author.name}</span>
              </p>
            )}
            <Link href="/blog" className="inline-flex items-center gap-2 font-quicksand font-bold text-sm text-forest hover:opacity-70 transition-opacity">
              <ArrowLeft size={15} /> All posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
