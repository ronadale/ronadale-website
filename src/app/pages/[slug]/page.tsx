import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client, PAGE_QUERY, PAGES_QUERY, FOOTER_QUERY } from '@/lib/sanity';
import PageClient from './PageClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const pages = await client.fetch(PAGES_QUERY, {}, { next: { revalidate: 0 } });
  return pages.map((page: { slug: { current: string } }) => ({
    slug: page.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await client.fetch(PAGE_QUERY, { slug: resolvedParams.slug }, { next: { revalidate: 0 } });
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.title,
    description: typeof page.description === 'string' ? page.description : page.title,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const [page, footer] = await Promise.all([
    client.fetch(PAGE_QUERY, { slug: resolvedParams.slug }, { next: { revalidate: 0 } }),
    client.fetch(FOOTER_QUERY, {}, { next: { revalidate: 0 } })
  ]);

  if (!page) {
    notFound();
  }

  return <PageClient page={page} footer={footer} />;
}