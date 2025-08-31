'use client';

import { useState } from 'react';
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
  images?: { asset: { _ref: string }; caption?: string }[];
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
            <p className="text-gallery-spacing">
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
            <div style={{ marginTop: '10px' }}>
              <p>{project.description}</p>
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