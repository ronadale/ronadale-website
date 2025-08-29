import Image from "next/image";
import { mockSiteSettings } from "@/lib/mock-data";

export default function Home() {
  return (
    <div>
      <div className="home-layout">
        <div className="text-section">
          <p>Chadwick Rantanen, Helene Fauquet</p>
          <p>October 4 - Dec 31 2025</p>
        </div>
        <div className="hero-section">
          <Image
            src={mockSiteSettings.heroImage}
            alt="Art residency location"
            width={800}
            height={600}
            className="hero-image"
            priority
          />
        </div>
      </div>
      <div className="project-footer">
        <p>44 Ronadale road, Craryville NY. Open by Appointment</p>
      </div>
    </div>
  );
}
