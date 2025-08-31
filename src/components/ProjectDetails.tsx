import { Project } from '@/lib/mock-data';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {

  return (
    <div>
      <div className="content-width">
        <p>{project.description}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}></div>
      
      <div>
        <p>PRESS:</p>
        {project.pressLinks.length > 0 && (
          <>
            {project.pressLinks.map((link) => (
              <p key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
              </p>
            ))}
          </>
        )}
        {project.pressRelease && (
          <>
            <br />
            <p><a href={project.pressRelease} target="_blank" rel="noopener noreferrer">DOWNLOAD THE PDF</a></p>
          </>
        )}
      </div>
      
      <div className="project-spacing"></div>
    </div>
  );
};

export default ProjectDetails;