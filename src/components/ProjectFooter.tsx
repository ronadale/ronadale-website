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

const ProjectFooter = async () => {
  const footer: FooterData | null = await client.fetch(FOOTER_QUERY, {}, { next: { revalidate: 0 } });
  
  const defaultText = "44 Ronadale road, Craryville NY. Open by Appointment";

  return (
    <div className="project-footer">
      {footer?.text ? (
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
      ) : (
        <p>{defaultText}</p>
      )}
    </div>
  );
};

export default ProjectFooter;