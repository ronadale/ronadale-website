import { Metadata } from 'next';
import { getProjectsByStatus } from '@/lib/mock-data';
import ProjectList from '@/components/ProjectList';

export const metadata: Metadata = {
  title: 'Upcoming Residents',
  description: 'Learn about the exciting projects planned by our upcoming artist residents.',
};

export default function UpcomingResidents() {
  const projects = getProjectsByStatus('upcoming');

  return (
    <ProjectList 
      projects={projects} 
      title="Upcoming Residents" 
    />
  );
}