import { Metadata } from 'next';
import Footer from '@/components/Footer';
import { mockSiteSettings } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mountain View Art Residency for inquiries about our programs and facilities.',
};

export default function Contact() {
  const { contactText, contactDetails } = mockSiteSettings;

  return (
    <div>
      
      <div className="page-content">
        <div className="content-spacing">
          <p><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></p>
          <br/>
          <p>
            44 Ronadale Road<br/>
            Craryville New York<br/>
            12521
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}