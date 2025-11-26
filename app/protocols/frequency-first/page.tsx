'use client';

import ProtocolLayout from '@/components/layouts/ProtocolLayout';
import Content, { frontmatter } from './content.mdx';

export default function Page() {
  return (
    <ProtocolLayout
      hero={frontmatter.title}
      subtitle={frontmatter.summary}
      aside={
        <div className="space-y-3 text-sm">
          <p className="text-muted">
            Protocol status: <strong>active</strong>
          </p>
          <ul className="text-muted list-disc pl-4">
            <li>Good for: shock, rupture, awe</li>
            <li>Time: unhurried</li>
            <li>Companion: optional witness</li>
          </ul>
        </div>
      }
    >
      <Content />
    </ProtocolLayout>
  );
}
