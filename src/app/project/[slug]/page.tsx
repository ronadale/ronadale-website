import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client, PROJECT_QUERY, PROJECTS_QUERY } from '@/lib/sanity';
import ProjectPageClient from './ProjectPageClient';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await client.fetch(PROJECTS_QUERY);
  return projects.map((project: any) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug });
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description || project.title,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug });

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}