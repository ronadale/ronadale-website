import { Metadata } from 'next';
import { getProjectsByStatus } from '@/lib/mock-data';
import ProjectList from '@/components/ProjectList';

export const metadata: Metadata = {
  title: 'Past Residents',
  description: 'Explore the works and projects of our past artist residents.',
};

export default function PastResidents() {
  const projects = getProjectsByStatus('past');

  return (
    <ProjectList 
      projects={projects} 
      title="Past Residents" 
    />
  );
}