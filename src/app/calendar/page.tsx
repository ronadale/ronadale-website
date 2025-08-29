import { Metadata } from 'next';
import { mockProjects } from '@/lib/mock-data';
import CalendarList from '@/components/CalendarList';

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'View all past, current, and upcoming artist residencies with their periods.',
};

export default function Calendar() {
  // Sort all projects by status order: current, upcoming, past
  const sortedProjects = mockProjects.sort((a, b) => {
    const statusOrder = { current: 1, upcoming: 2, past: 3 };
    if (a.status !== b.status) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return a.order - b.order;
  });

  return (
    <div>
      
      <div className="page-content">
        <CalendarList projects={sortedProjects} />
      </div>
    </div>
  );
}