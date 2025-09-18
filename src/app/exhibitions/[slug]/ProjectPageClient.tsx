'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import ImageGallery from '@/components/ImageGallery';

interface SanityProject {
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
  artists?: { name: string; bio?: string }[];
  startDate?: string;
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

interface ProjectPageClientProps {
  project: SanityProject;
  footer: FooterData | null;
}

export default function ProjectPageClient({ project, footer }: ProjectPageClientProps) {
  const [expandedText, setExpandedText] = useState(!project.isDescriptionCollapsed);

  // Check if description contains Helvetica formatting
  const hasHelveticaFormatting = () => {
    if (typeof project.description === 'string') return false;
    if (!Array.isArray(project.description)) return false;

    return project.description.some((block: { _type: string; style?: string }) =>
      block._type === 'block' && block.style === 'helvetica'
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

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} — ${formatDate(endDate)}`;
    }
    return '';
  };

  return (
    <div>
      <div className="page-content">
        <div>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''}>{project.artists?.filter(a => a && a.name).map(a => a.name).join(', ') || project.title}</p>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''}>{project.title}</p>
          <p className={useHelveticaStyle ? 'helvetica-text' : ''} style={{ marginBottom: 0 }}>{formatDateRange(project.startDate, project.endDate)}</p>
          {project.description && project.isDescriptionCollapsed && (
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
          {(expandedText || !project.isDescriptionCollapsed) && project.description && (
            <div className="content-width" style={{ marginTop: '1em' }}>
              {typeof project.description === 'string' ? (
                <p style={{ whiteSpace: 'pre-wrap' }}>{project.description}</p>
              ) : (
                <div style={{ whiteSpace: 'pre-line' }}>
                  <PortableText
                    value={project.description}
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
                </div>
              )}
              
              {(project.pressLinks && project.pressLinks.length > 0) || (project.pressDownloads && project.pressDownloads.length > 0) ? (
                <div style={{ marginTop: '1em' }}>
                  <p>Press:</p>
                  {project.pressLinks?.map((link, index) => (
                    <p key={index}>
                      –{' '}
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title}
                      </a>
                    </p>
                  ))}
                  {project.pressDownloads && project.pressDownloads.length > 0 && (
                    <div style={{ marginTop: '1em' }}>
                      {project.pressDownloads.map((download, index) => (
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
          {project.images && project.images.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <ImageGallery images={project.images} />
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
                  <a href={`mailto:${value.email}`} className="helvetica-email-link">
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