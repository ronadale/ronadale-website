import Link from 'next/link';
import { Project } from '@/lib/mock-data';
import Footer from './Footer';

interface ProjectListProps {
  projects: Project[];
  title: string;
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div>
      
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <p>
              <Link href={`/project/${project.slug}`}>
                {project.artist.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectList;