import { Project } from '@/lib/mock-data';

interface CalendarListProps {
  projects: Project[];
}

const CalendarList = ({ projects }: CalendarListProps) => {
  const getSectionTitle = (status: string) => {
    switch (status) {
      case 'current':
        return 'CURRENT';
      case 'upcoming':
        return 'UPCOMING';
      case 'past':
        return 'PAST';
      default:
        return '';
    }
  };

  let currentSection = '';

  return (
    <div>
      {projects.map((project) => {
        const showSectionHeader = currentSection !== project.status;
        if (showSectionHeader) {
          currentSection = project.status;
        }

        return (
          <div key={project.id}>
            {showSectionHeader && (
              <>
                {currentSection !== 'current' && <div style={{ marginBottom: '20px' }}></div>}
                <div>
                  <h2>{getSectionTitle(project.status)}</h2>
                </div>
              </>
            )}
            
            <div className="project-item">
              <p>
                <a href={`/project/${project.slug}`}>
                  {project.residencyPeriod} – <em>{project.title}</em> – {project.artist.name}
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarList;