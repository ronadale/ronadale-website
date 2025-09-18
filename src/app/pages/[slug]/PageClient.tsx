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
  isDescriptionCollapsed?: boolean;
  artists?: { name: string }[];
  date?: string;
  endDate?: string;
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
  const [expandedText, setExpandedText] = useState(!page.isDescriptionCollapsed);

  // Check if description contains Helvetica formatting
  const hasHelveticaFormatting = () => {
    if (typeof page.description === 'string') return false;
    if (!Array.isArray(page.description)) return false;

    return page.description.some(block =>
      block.style === 'helvetica'
    );
  };

  const useHelveticaStyle = hasHelveticaFormatting();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (!endDate) {
      return formatDate(startDate);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }

    // Same year
    if (start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    // Different years
    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
  };

  return (
    <div>
      <div className="page-content">
        <div>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''}>{page.artists?.filter(a => a && a.name).map(a => a.name).join(', ') || page.title}</p>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''}>{page.title}</p>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''} style={{ marginBottom: 0 }}>{page.date ? formatDateRange(page.date, page.endDate) : ''}</p>
          {page.description && page.isDescriptionCollapsed && (
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
          {(expandedText || !page.isDescriptionCollapsed) && page.description && (
            <div className="content-width" style={{ marginTop: '1em' }}>
              {typeof page.description === 'string' ? (
                <p>{page.description}</p>
              ) : (
                <PortableText
                  value={page.description}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                      helvetica: ({ children }) => <p className="helvetica-text">{children}</p>,
                    },
                    marks: {
                      link: ({ children, value }) => (
                        <a href={value.href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                      emailLink: ({ children, value }) => (
                        <a href={`mailto:${value.email}`} className="helvetica-email-link">
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
      {footer?.text && (
        <div className="project-footer">
          <PortableText
            value={footer.text}
            components={{
              block: {
                normal: ({ children }) => <p>{children}</p>,
                helvetica: ({ children }) => <p className="helvetica-text">{children}</p>,
              },
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
            }}
          />
        </div>
      )}
    </div>
  );
}