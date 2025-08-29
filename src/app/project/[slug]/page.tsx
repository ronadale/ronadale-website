import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, mockProjects } from '@/lib/mock-data';
import ProjectPageClient from './ProjectPageClient';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}