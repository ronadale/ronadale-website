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
  artists?: { name: string; bio?: string }[];
  startDate?: string;
  endDate?: string;
  status: string;
  images?: { asset: { _id: string; _ref?: string; url?: string }; caption?: string }[];
  pressLinks?: { title: string; url: string }[];
  pressDownloads?: { title: string; file: { asset: { url: string } } }[];
}

interface ProjectPageClientProps {
  project: SanityProject;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [expandedText, setExpandedText] = useState(false);

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
          <p>{project.artists?.map(a => a.name).join(', ') || project.title}</p>
          <p>{project.title}</p>
          <p style={{ marginBottom: 0 }}>{formatDateRange(project.startDate, project.endDate)}</p>
          {project.description && (
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
          {expandedText && project.description && (
            <div className="content-width">
              {typeof project.description === 'string' ? (
                <p>{project.description}</p>
              ) : (
                <PortableText 
                  value={project.description}
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
      <div className="project-footer">
        <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
      </div>
    </div>
  );
}