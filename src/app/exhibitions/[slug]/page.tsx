import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client, PROJECT_QUERY, PROJECTS_QUERY, FOOTER_QUERY } from '@/lib/sanity';
import ProjectPageClient from './ProjectPageClient';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: 0 } });
  return projects.map((project: { slug: { current: string } }) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug }, { next: { revalidate: 0 } });
  
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
  const [project, footer] = await Promise.all([
    client.fetch(PROJECT_QUERY, { slug: resolvedParams.slug }, { next: { revalidate: 0 } }),
    client.fetch(FOOTER_QUERY, {}, { next: { revalidate: 0 } })
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} footer={footer} />;
}