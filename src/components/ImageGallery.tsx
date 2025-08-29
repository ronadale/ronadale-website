import Image from 'next/image';
import { GalleryImage } from '@/lib/mock-data';

interface ImageGalleryProps {
  images: GalleryImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  return (
    <div className="image-feed">
      {images.map((image, index) => (
        <div key={image.id} className="feed-item">
          <a 
            href={image.image} 
            target="_blank" 
            rel="noopener noreferrer"
            className="feed-image-link"
          >
            <Image
              src={image.image}
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
      ))}
    </div>
  );
};

export default ImageGallery;