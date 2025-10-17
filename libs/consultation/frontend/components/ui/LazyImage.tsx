import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * LazyImage Component
 * Optimized image loading with:
 * - Intersection Observer for lazy loading
 * - Blur-up placeholder effect
 * - WebP support with fallback
 * - Responsive srcset support
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading the image when it enters viewport
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    setImageSrc(placeholder);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={`
          w-full h-full object-cover transition-all duration-300
          ${!isLoaded && !isError ? 'blur-sm scale-105' : 'blur-0 scale-100'}
          ${isError ? 'opacity-50' : 'opacity-100'}
        `}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

/**
 * Utility function to generate responsive srcset
 * @param basePath - Base path without extension (e.g., "/images/hero")
 * @param format - Image format (webp, jpg, png)
 * @param sizes - Array of widths [320, 640, 1024, 1920]
 */
export const generateSrcSet = (
  basePath: string,
  format: 'webp' | 'jpg' | 'png' = 'webp',
  sizes: number[] = [320, 640, 1024, 1920]
): string => {
  return sizes
    .map((size) => `${basePath}-${size}w.${format} ${size}w`)
    .join(', ');
};

/**
 * OptimizedImage - Component with WebP support and fallback
 */
interface OptimizedImageProps extends LazyImageProps {
  basePath: string; // e.g., "/images/hero"
  sizes?: string; // e.g., "(max-width: 768px) 100vw, 50vw"
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  basePath,
  sizes = '100vw',
  alt,
  className,
  ...props
}) => {
  return (
    <picture>
      {/* WebP version (modern browsers) */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(basePath, 'webp')}
        sizes={sizes}
      />
      
      {/* JPEG fallback (older browsers) */}
      <source
        type="image/jpeg"
        srcSet={generateSrcSet(basePath, 'jpg')}
        sizes={sizes}
      />
      
      {/* Default image */}
      <LazyImage
        src={`${basePath}-1024w.jpg`}
        alt={alt}
        className={className}
        {...props}
      />
    </picture>
  );
};

export default LazyImage;

