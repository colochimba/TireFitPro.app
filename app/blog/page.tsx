import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Tire Fitment Blog | Tips, Guides & Size Comparison | TireFitPro",
  description:
    "Tire fitment guides, size comparison tips, and expert advice for trucks, SUVs, and cars. Learn how to choose the right tire size for your vehicle.",
};

const tagColors: Record<string, string> = {
  Guide: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Trucks: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Modifications: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Off-Road": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  SUV: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-2">
          <span className="text-blue-400 text-sm font-semibold tracking-wide">
            📖 TireFitPro Blog
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Tire Guides &{" "}
          <span className="text-orange-500">Tips</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Expert guides on tire sizing, fitment, and upgrades for trucks, SUVs,
          and cars.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block no-underline">
            <article
              className="h-full card p-6 hover:border-orange-500/40 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`badge border ${tagColors[post.tag] ?? "bg-slate-500/10 text-slate-400 border-slate-500/30"}`}
                >
                  {post.tag}
                </span>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-slate-600 text-xs">{post.readTime}</span>
              </div>
              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <time className="text-slate-600 text-xs" dateTime={post.date}>
                  {post.date}
                </time>
                <span className="text-orange-500 text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* CTA back to calculator */}
      <div className="mt-14 text-center card p-8 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to compare tire sizes?
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          Use our free calculator to check diameter, speedometer error, and
          fitment instantly.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 no-underline">
          <span>🔢</span> Open Calculator
        </Link>
      </div>
    </div>
  );
}
