import React, { useEffect, useRef, useState } from 'react';

import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderSrc?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  onLoad?: () => void;
  aspectRatio?: string;
  fallbackAspectRatio?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderSrc,
  objectFit = 'cover',
  onLoad,
  aspectRatio,
  fallbackAspectRatio = '16/9',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultPlaceholder =
    placeholderSrc ||
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23cccccc"/%3E%3C/svg%3E';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '200px',
        threshold: 0,
      },
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && !width && !height && !imageDimensions) {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
      };

      return () => {
        img.onload = null;
      };
    }
  }, [isIntersecting, src, width, height, imageDimensions]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const getContainerStyle = () => {
    if (width && height) {
      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    }

    if (aspectRatio) {
      return {
        width: '100%',
        aspectRatio,
      };
    }

    if (imageDimensions) {
      return {
        width: '100%',
        aspectRatio: `${imageDimensions.width}/${imageDimensions.height}`,
      };
    }

    return {
      width: '100%',
      aspectRatio: fallbackAspectRatio,
    };
  };

  return (
    <div ref={containerRef} className={`${styles.imageContainer} ${className}`} style={getContainerStyle()}>
      {!isLoaded && (
        <div
          className={styles.placeholder}
          style={{
            backgroundImage: `url(${defaultPlaceholder})`,
          }}
        />
      )}

      {isIntersecting && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
          style={{ objectFit }}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default LazyImage;
