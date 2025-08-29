import { Metadata } from 'next';
import Link from 'next/link';
import { getProjectsByStatus } from '@/lib/mock-data';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'Current, upcoming and past artist exhibitions and residencies.',
};

export default function Exhibitions() {
  const currentProjects = getProjectsByStatus('current');
  const upcomingProjects = getProjectsByStatus('upcoming');
  const pastProjects = getProjectsByStatus('past');

  return (
    <div>
      
      <div style={{ maxWidth: '50%' }}>
        <h2>CURRENT:</h2>
        <br />
        {currentProjects.map((project) => (
          <Link key={project.id} href={`/project/${project.slug}`} className="project-item">
            <p>{project.artist.name}</p>
            <p>{project.title}</p>
            <p>{project.residencyPeriod}</p>
          </Link>
        ))}
        
        <br />
        
        <h2>UPCOMING:</h2>
        <br />
        {upcomingProjects.map((project) => (
          <Link key={project.id} href={`/project/${project.slug}`} className="project-item">
            <p>{project.artist.name}</p>
            <p>{project.title}</p>
            <p>{project.residencyPeriod}</p>
          </Link>
        ))}
        
        <br />
        
        <h2>PAST:</h2>
        <br />
{pastProjects.map((project, index) => (
          <div key={project.id}>
            <Link href={`/project/${project.slug}`} className="project-item">
              <p>{project.artist.name}</p>
              <p>{project.title}</p>
              <p>{project.residencyPeriod}</p>
            </Link>
            {index < pastProjects.length - 1 && <br />}
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
}