import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

interface SanityImage {
  asset: { _id: string; _ref?: string };
  caption?: string | Array<{
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
}

interface ImageGalleryProps {
  images: SanityImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) return null;

  const getAltText = (caption: SanityImage['caption'], index: number): string => {
    if (typeof caption === 'string') {
      return caption;
    }
    if (Array.isArray(caption) && caption.length > 0) {
      const firstBlock = caption[0];
      if (firstBlock.children && firstBlock.children.length > 0) {
        return firstBlock.children[0].text || `Gallery image ${index + 1}`;
      }
    }
    return `Gallery image ${index + 1}`;
  };

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
                  alt={getAltText(image.caption, index)}
                  width={1200}
                  height={800}
                  className="gallery-image"
                  sizes="(max-width: 480px) 100vw, (max-width: 1000px) 90vw, 80vw"
                  priority={index < 2}
                />
              </a>
              {image.caption && (
                <div className="feed-caption">
                  {typeof image.caption === 'string' ? (
                    // Legacy string captions
                    <p>
                      {image.caption.split('\n').map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ) : (
                    // New rich text captions
                    <PortableText 
                      value={image.caption}
                      components={{
                        marks: {
                          link: ({ children, value }) => (
                            <a href={value.href} target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                        },
                        types: {
                          lineBreak: () => <br />,
                        },
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ImageGallery;