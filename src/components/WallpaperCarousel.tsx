
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const carouselImages = [
  {
    id: '1',
    src: '/vanilla-cake.jpg',
    alt: 'Vanilla Cake',
  },
  {
    id: '2',
    src: '/chocolate-cake.jpg',
    alt: 'Chocolate Cake',
  },
  {
    id: '3',
    src: '/strawberry-cake.jpg',
    alt: 'Strawberry Cake',
  },
  {
    id: '4',
    src: '/macaron-cake.png',
    alt: 'Macaron Cake',
  },
];

const WallpaperCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Automatically rotate slides every 4 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="m-0 h-full">
          {carouselImages.map((image, index) => (
            <CarouselItem 
              key={image.id} 
              className={`p-0 w-full h-full ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 pointer-events-none" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Dots navigation */}
        <div className="flex justify-center gap-2 absolute bottom-4 left-0 right-0 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default WallpaperCarousel;
