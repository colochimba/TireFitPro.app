import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

// Generate static routes at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for each post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | TireFitPro',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | TireFitPro`,
    description: post.metaDescription,
    keywords: [post.tag.toLowerCase(), 'tire fitment', 'tire size comparison'],
    openGraph: {
      type: 'article',
      title: `${post.title} | TireFitPro`,
      description: post.metaDescription,
      url: `https://tirefitpro.com/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-4">
        <Link href="/blog" className="text-orange-500 hover:text-orange-400 text-sm font-semibold flex items-center gap-1 transition-colors">
          <span>←</span> Back to all posts
        </Link>
      </div>

      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            {post.tag}
          </span>
          <span className="text-slate-500 text-sm">{post.date}</span>
          <span className="text-slate-500 text-sm">·</span>
          <span className="text-slate-500 text-sm">{post.readTime}</span>
        </div>
        <h1 className="text-4xl text-white font-extrabold tracking-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-slate-400 italic">
          {post.excerpt}
        </p>
      </header>

      {/* Since we don't have Tailwind Typography installed, we use a custom styled component block for the content */}
      <div 
        className="prose-content text-slate-300 space-y-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .prose-content h2 { color: white; font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
        .prose-content h3 { color: white; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose-content p { margin-bottom: 1rem; }
        .prose-content a { color: #f97316; text-decoration: underline; }
        .prose-content a:hover { color: #fdba74; }
        .prose-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #94a3b8; }
        .prose-content li { margin-bottom: 0.5rem; }
        .prose-content strong { color: white; font-weight: 600; }
      `}} />

      <div className="mt-16 pt-8 border-t border-[#1E293B]">
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-3">Check Your Fitment Now</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Ready to upgrade? Use our completely free tire size calculator to ensure your speedometer and clearance stay right.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Launch Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}
