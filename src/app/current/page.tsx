import { Metadata } from 'next';
import Link from 'next/link';
import { client, PROJECTS_QUERY } from '@/lib/sanity';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'Current, upcoming and past artist exhibitions and residencies.',
};

export default async function Exhibitions() {
  const projects = await client.fetch(PROJECTS_QUERY);
  
  const currentProjects = projects.filter(p => p.status === 'current');
  const upcomingProjects = projects.filter(p => p.status === 'upcoming');
  const pastProjects = projects.filter(p => p.status === 'past');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return '';
  };

  return (
    <div>
      
      <div className="content-width">
        {currentProjects.length > 0 && (
          <>
            <h2>CURRENT:</h2>
            <br />
            {currentProjects.map((project) => (
              <Link key={project._id} href={`/project/${project.slug.current}`} className="project-item">
                <p>{project.artists?.map(a => a.name).join(', ') || project.title}</p>
                <p>{project.title}</p>
                <p>{formatDateRange(project.startDate, project.endDate)}</p>
              </Link>
            ))}
            <br />
          </>
        )}
        
        {upcomingProjects.length > 0 && (
          <>
            <h2>UPCOMING:</h2>
            <br />
            {upcomingProjects.map((project) => (
              <div key={project._id} style={{ 
                cursor: 'default',
                marginBottom: '0',
                display: 'block',
                color: 'inherit',
                textDecoration: 'none'
              }}>
                <p>{project.artists?.map(a => a.name).join(', ') || project.title}</p>
                <p>{project.title}</p>
                <p>{formatDateRange(project.startDate, project.endDate)}</p>
              </div>
            ))}
            <br />
          </>
        )}
        
        {pastProjects.length > 0 && (
          <>
            <h2>PAST:</h2>
            <br />
            {pastProjects.map((project, index) => (
              <div key={project._id}>
                <Link href={`/project/${project.slug.current}`} className="project-item">
                  <p>{project.artists?.map(a => a.name).join(', ') || project.title}</p>
                  <p>{project.title}</p>
                  <p>{formatDateRange(project.startDate, project.endDate)}</p>
                </Link>
                {index < pastProjects.length - 1 && <br />}
              </div>
            ))}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}