import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import mdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const remarkPlugins = [
  remarkFrontmatter,
  [mdxFrontmatter, { name: 'frontmatter' }],
  remarkGfm,
];

const rehypePlugins = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'append' }],
];

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    // Use the JavaScript MDX compiler so remark/rehype plugins run.
    // Needed for remark-mdx-frontmatter to export `frontmatter` from MDX files.
    mdxRs: false,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins,
    rehypePlugins,
  },
});

export default withMDX(nextConfig);
