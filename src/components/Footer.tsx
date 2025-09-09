import { PortableText } from '@portabletext/react';
import { client, FOOTER_QUERY } from '@/lib/sanity';

interface FooterData {
  _id: string;
  text: Array<{
    _type: 'block';
    children: Array<{
      _type: 'span';
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: 'link';
      href: string;
    }>;
  }>;
  isActive: boolean;
}

const Footer = async () => {
  const footer: FooterData | null = await client.fetch(FOOTER_QUERY, {}, { next: { revalidate: 0 } });

  if (!footer?.text) {
    return null;
  }

  return (
    <footer className="footer">
      <div style={{ whiteSpace: 'pre-line' }}>
        <PortableText 
          value={footer.text}
          components={{
            marks: {
              link: ({ children, value }) => (
                <a href={value.href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            },
            block: {
              normal: ({ children }) => <p>{children}</p>,
            },
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;