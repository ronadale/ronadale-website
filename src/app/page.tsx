import Image from "next/image";
import Link from "next/link";
import { client, SITE_SETTINGS_QUERY, urlFor } from "@/lib/sanity";

export default async function Home() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);
  const upcomingExhibition = siteSettings?.upcomingExhibition;
  
  // Debug logging
  console.log('siteSettings:', siteSettings);
  console.log('upcomingExhibition:', upcomingExhibition);

  if (!upcomingExhibition) {
    return (
      <div>
        <div className="home-layout">
          <div className="text-section">
            <p>No upcoming exhibition selected</p>
            <p>Please configure in Studio</p>
          </div>
        </div>
        <div className="project-footer">
          <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
        </div>
      </div>
    );
  }

  const heroImage = upcomingExhibition.coverImage || upcomingExhibition.images?.[0];
  const artists = upcomingExhibition.artists?.map((artist: { name: string }) => artist.name).join(', ');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="homepage-layout">
        {/* Left side - Exhibition info */}
        <div className="homepage-text">
          <p>{artists}</p>
          <p>{upcomingExhibition.title}</p>
          {upcomingExhibition.startDate && upcomingExhibition.endDate && (
            <p>
              {formatDate(upcomingExhibition.startDate)} - {formatDate(upcomingExhibition.endDate)}
            </p>
          )}
        </div>

        {/* Hero image */}
        {heroImage?.asset ? (
          upcomingExhibition.status === 'current' ? (
            <Link href={`/project/${upcomingExhibition.slug.current}`}>
              <Image
                src={urlFor(heroImage.asset).width(1200).quality(90).url()}
                alt={heroImage.caption || upcomingExhibition.title || `Exhibition image${artists ? ' for ' + artists : ''}`}
                width={1200}
                height={0}
                priority
                className="homepage-image"
              />
            </Link>
          ) : (
            <Image
              src={urlFor(heroImage.asset).width(1200).quality(90).url()}
              alt={heroImage.caption || upcomingExhibition.title || `Exhibition image${artists ? ' for ' + artists : ''}`}
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
      <div className="project-footer">
        <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
      </div>
    </div>
  );
}
