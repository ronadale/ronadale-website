import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface SanityImage {
  asset: { _ref: string };
  caption?: string;
}

interface ImageGalleryProps {
  images: SanityImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  return (
    <div className="image-feed">
      {images.map((image, index) => {
        const imageUrl = urlFor(image.asset).width(1200).quality(90).url();
        return (
          <div key={`${image.asset._ref}-${index}`} className="feed-item">
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="feed-image-link"
            >
              <Image
                src={imageUrl}
                alt={image.caption || `Gallery image ${index + 1}`}
                width={1200}
                height={800}
                style={{ 
                  width: 'auto', 
                  height: '90vh',
                  maxWidth: '100%'
                }}
              />
            </a>
            {image.caption && (
              <p className="feed-caption">
                {image.caption.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;