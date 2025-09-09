'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import ImageGallery from '@/components/ImageGallery';

interface SanityPage {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string | Array<{
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
  artists?: { name: string }[];
  date?: string;
  status: string;
  images?: { asset: { _id: string; _ref?: string; url?: string }; caption?: string }[];
  pressLinks?: { title: string; url: string }[];
  pressDownloads?: { title: string; file: { asset: { url: string } } }[];
}

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

interface PageClientProps {
  page: SanityPage;
  footer: FooterData | null;
}

export default function PageClient({ page, footer }: PageClientProps) {
  const [expandedText, setExpandedText] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="page-content">
        <div>
          <p>{page.artists?.map(a => a.name).join(', ') || page.title}</p>
          <p>{page.title}</p>
          <p style={{ marginBottom: 0 }}>{page.date ? formatDate(page.date) : ''}</p>
          {page.description && (
            <p style={{ marginBottom: '1em' }}>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedText(!expandedText);
                }}
              >
                text
              </a>
            </p>
          )}
          {expandedText && page.description && (
            <div className="content-width">
              {typeof page.description === 'string' ? (
                <p>{page.description}</p>
              ) : (
                <PortableText 
                  value={page.description}
                  components={{
                    marks: {
                      link: ({ children, value }) => (
                        <a href={value.href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              )}
              
              {(page.pressLinks && page.pressLinks.length > 0) || (page.pressDownloads && page.pressDownloads.length > 0) ? (
                <div style={{ marginTop: '1em' }}>
                  <p>Press:</p>
                  {page.pressLinks?.map((link, index) => (
                    <p key={index}>
                      –{' '}
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title}
                      </a>
                    </p>
                  ))}
                  {page.pressDownloads && page.pressDownloads.length > 0 && (
                    <div style={{ marginTop: '1em' }}>
                      {page.pressDownloads.map((download, index) => (
                        <p key={index}>
                          <a href={download.file.asset.url} target="_blank" rel="noopener noreferrer">
                            DOWNLOAD PDF
                          </a>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
          {page.images && page.images.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <ImageGallery images={page.images} />
            </div>
          )}
        </div>
      </div>
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
          <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
        )}
      </div>
    </div>
  );
}