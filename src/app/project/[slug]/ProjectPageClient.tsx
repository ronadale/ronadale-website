'use client';

import { useState, useEffect } from 'react';
import ImageGallery from '@/components/ImageGallery';

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
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
            <p style={{ marginBottom: '3em' }}>
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
            <div style={{ width: isMobile ? '100%' : '50%' }}>
              <p>{project.description}</p>
              
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