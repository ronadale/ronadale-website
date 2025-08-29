'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/mock-data';

interface ImageCarouselProps {
  images: GalleryImage[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Image
          src={images[currentIndex].image}
          alt={images[currentIndex].caption || `Gallery image ${currentIndex + 1}`}
          width={600}
          height={400}
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        />
      </div>
      
      {images[currentIndex].caption && (
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>
          {images[currentIndex].caption}
        </p>
      )}
      
      {images.length > 1 && (
        <div className="gallery-nav">
          <button onClick={goToPrevious}>Previous</button>
          <span> {currentIndex + 1} of {images.length} </span>
          <button onClick={goToNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;