import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: '44 Ronadale road, Craryville NY. Open by Appointment',
};

export default function Contact() {

  return (
    <div>
      
      <div className="page-content">
        <div className="content-spacing">
          <p><a href="mailto:info@ronadale.com">info@ronadale.com</a></p>
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