import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import Footer from '@/components/Footer';
import { client, INFO_PAGE_QUERY } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Contact',
  description: '44 Ronadale road, Craryville NY. Open by Appointment',
};

interface InfoPageData {
  _id: string;
  content: Array<{
    _type: 'block';
    children: Array<{
      _type: 'span';
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: 'link' | 'emailLink';
      href?: string;
      email?: string;
    }>;
  }>;
}

export default async function Contact() {
  const infoPage: InfoPageData | null = await client.fetch(INFO_PAGE_QUERY, {}, { next: { revalidate: 0 } });

  return (
    <div>
      <div className="page-content">
        <div className="content-spacing">
          {infoPage?.content ? (
            <PortableText
              value={infoPage.content}
              components={{
                marks: {
                  link: ({ children, value }) => (
                    <a href={value.href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  emailLink: ({ children, value }) => (
                    <a href={`mailto:${value.email}`}>
                      {children}
                    </a>
                  ),
                },
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                },
              }}
            />
          ) : (
            <p><a href="mailto:info@ronadale.com">info@ronadale.com</a></p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}