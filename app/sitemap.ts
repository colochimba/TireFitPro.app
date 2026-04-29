import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogPosts.map((post) => ({
    url: `https://tirefitpro.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: 'https://tirefitpro.com',
      lastModified: new Date(),
    },
    {
      url: 'https://tirefitpro.com/blog',
      lastModified: new Date(),
    },
    ...blogs,
  ];
}
