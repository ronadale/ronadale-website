import Image from 'next/image';
import { useState, useEffect } from 'react';
import { urlFor } from '@/lib/sanity';

interface SanityImage {
  asset: { _id: string; _ref?: string };
  caption?: string;
}

interface ImageGalleryProps {
  images: SanityImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="image-feed">
      {images
        .filter((image) => image && image.asset && (image.asset._id || image.asset._ref))
        .map((image, index) => {
          const imageUrl = urlFor(image.asset).width(1200).quality(90).url();
          return (
            <div key={`${image.asset._id || image.asset._ref}-${index}`} className="feed-item">
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
                    height: '90vh'
                  }}
                  className="gallery-image"
                  sizes="(max-width: 480px) 100vw, 90vh"
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