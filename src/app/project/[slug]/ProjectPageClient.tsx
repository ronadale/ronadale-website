'use client';

import { useState } from 'react';
import ProjectDetails from '@/components/ProjectDetails';
import ImageGallery from '@/components/ImageGallery';
import Footer from '@/components/Footer';
import { Project } from '@/lib/mock-data';

interface ProjectPageClientProps {
  project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [expandedText, setExpandedText] = useState(false);

  const formatResidencyPeriod = (period: string) => {
    const months = {
      'Jan': 'January',
      'Feb': 'February', 
      'Mar': 'March',
      'Apr': 'April',
      'May': 'May',
      'Jun': 'June',
      'Jul': 'July',
      'Aug': 'August',
      'Sep': 'September',
      'Oct': 'October',
      'Nov': 'November',
      'Dec': 'December'
    };
    
    return period.replace(/(\d+)\s+(\w+)/g, (match, day, month) => {
      return `${months[month as keyof typeof months]} ${day}`;
    });
  };

  return (
    <div>
      <div className="page-content">
        <div>
          <p>{project.artist.name}</p>
          <p>{project.title}</p>
          <p style={{ marginBottom: 0 }}>{formatResidencyPeriod(project.residencyPeriod)}</p>
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
          {expandedText && (
            <div style={{ marginTop: '10px' }}>
              <ProjectDetails project={project} />
            </div>
          )}
          {project.gallery.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <ImageGallery images={project.gallery} />
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