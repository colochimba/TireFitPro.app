import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogPosts.map((post) => ({
    url: `https://tirefitpro.app/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: 'https://tirefitpro.app',
      lastModified: new Date(),
    },
    {
      url: 'https://tirefitpro.app/blog',
      lastModified: new Date(),
    },
    ...blogs,
  ];
}
