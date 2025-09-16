'use client';

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';

interface Artist {
  name: string;
}

interface ImageAsset {
  asset: {
    _id: string;
    _ref?: string;
    url?: string;
  };
  caption?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  status: string;
  startDate?: string;
  endDate?: string;
  coverImage?: ImageAsset;
  images?: ImageAsset[];
  artists?: Artist[];
}

interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  status: string;
  date?: string;
  endDate?: string;
  coverImage?: ImageAsset;
  images?: ImageAsset[];
  artists?: Artist[];
}

interface SiteSettings {
  upcomingExhibition?: Project;
  heroPage?: Page;
}

interface FooterData {
  _id: string;
  text: Array<{
    _type: 'block';
    children: Array<{
      _type: 'span';
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: 'link';
      href: string;
    }>;
  }>;
  isActive: boolean;
}

interface HomepageClientProps {
  siteSettings: SiteSettings;
  footer: FooterData | null;
}

export default function HomepageClient({ siteSettings, footer }: HomepageClientProps) {
  const upcomingExhibition = siteSettings?.upcomingExhibition;
  const heroPage = siteSettings?.heroPage;

  // Debug logging for linking logic
  const shouldLink = heroPage || (upcomingExhibition && upcomingExhibition.status === 'current');
  console.log('CLIENT shouldLink:', shouldLink);
  console.log('CLIENT heroPage exists:', !!heroPage);
  console.log('CLIENT Link URL would be:', heroPage ? `/pages/${heroPage.slug.current}` : 'no link');
  console.log('CLIENT heroPage.slug:', heroPage?.slug);
  console.log('CLIENT Full condition result:', (heroPage || (upcomingExhibition && upcomingExhibition.status === 'current')));

  if (!upcomingExhibition && !heroPage) {
    return (
      <div>
        <div className="home-layout">
          <div className="text-section">
            <p>No content selected for homepage</p>
            <p>Please configure either a Featured Exhibition or Hero Page in Studio</p>
          </div>
        </div>
        <div className="project-footer">
          <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
        </div>
      </div>
    );
  }

  // Use hero page if available, otherwise fall back to exhibition
  const displayContent = heroPage || upcomingExhibition;

  // This should never happen due to the early return above, but TypeScript needs the guard
  if (!displayContent) {
    return null;
  }

  const heroImage = displayContent.coverImage || displayContent.images?.[0];
  const artists = displayContent.artists?.filter((a: Artist | null | undefined): a is Artist => a !== null && a !== undefined && Boolean(a.name)).map((artist: Artist) => artist.name).join(', ');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';
    if (!endDate) return formatDate(startDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
    }

    // Same year
    if (start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    // Different years
    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
  };

  return (
    <div>
      <div className="homepage-layout">
        {/* Left side - Content info */}
        {/* Make entire text area clickable if hero page or current exhibition */}
        {!!(heroPage || (upcomingExhibition && upcomingExhibition.status === 'current')) ? (
          <Link href={heroPage ? `/pages/${heroPage.slug.current}` : `/exhibitions/${upcomingExhibition!.slug.current}`}>
            <div className="homepage-text">
              <p>{artists}</p>
              {displayContent.title && <p>{displayContent.title}</p>}
              {(displayContent.startDate || displayContent.date) && (
                <p>
                  {formatDateRange(
                    displayContent.startDate || displayContent.date,
                    displayContent.endDate
                  )}
                </p>
              )}
            </div>
          </Link>
        ) : (
          <div className="homepage-text">
            <p>{artists}</p>
            {displayContent.title && <p>{displayContent.title}</p>}
            {(displayContent.startDate || displayContent.date) && (
              <p>
                {formatDateRange(
                  displayContent.startDate || displayContent.date,
                  displayContent.endDate
                )}
              </p>
            )}
          </div>
        )}

        {/* Hero image */}
        {heroImage?.asset ? (
          // Link if it's a hero page OR if it's a current exhibition
          (heroPage || (upcomingExhibition && upcomingExhibition.status === 'current')) ? (
            <Link href={heroPage ? `/pages/${heroPage.slug.current}` : `/exhibitions/${upcomingExhibition!.slug.current}`}>
              <Image
                src={urlFor(heroImage.asset).width(1200).quality(90).url()}
                alt={heroImage.caption || displayContent.title || `Image${artists ? ' for ' + artists : ''}`}
                width={1200}
                height={0}
                priority
                className="homepage-image"
              />
            </Link>
          ) : (
            <Image
              src={urlFor(heroImage.asset).width(1200).quality(90).url()}
              alt={heroImage.caption || displayContent.title || `Image${artists ? ' for ' + artists : ''}`}
              width={1200}
              height={0}
              priority
              className="homepage-image"
            />
          )
        ) : (
          <div className="homepage-image" style={{
            background: '#f0f0f0',
            width: '800px',
            height: '400px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p>No image available</p>
          </div>
        )}
      </div>
      {footer?.text && (
        <div className="project-footer">
          <PortableText
            value={footer.text}
            components={{
              marks: {
                link: ({ children, value }) => (
                  <a href={value.href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              },
              block: {
                normal: ({ children }) => <p>{children}</p>,
              },
              types: {
                lineBreak: () => <br />,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}