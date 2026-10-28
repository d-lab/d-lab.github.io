'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LightboxImage = {
  src: string;
  alt: string;
};

// Enlarging is a large-screen feature; on phones the photos already fill the width.
const LARGE_SCREEN_QUERY = '(min-width: 1024px)';

type ImageLightboxProps = {
  children: ReactNode;
  className?: string;
};

// Makes every image inside `children` open in a full-screen viewer on large screens.
// It works on plain <img> elements, so it covers both next/image output and
// Markdown-rendered blog HTML.
export default function ImageLightbox({ children, className }: ImageLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageElementsRef = useRef<HTMLImageElement[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia(LARGE_SCREEN_QUERY);
    let removeEnhancements = () => {};

    const enhanceImages = () => {
      removeEnhancements();

      if (!mediaQuery.matches) {
        dialogRef.current?.close();
        return;
      }

      const imageElements = Array.from(container.querySelectorAll('img'));
      imageElementsRef.current = imageElements;
      setImages(imageElements.map((image) => ({ src: image.src, alt: image.alt })));

      const cleanups = imageElements.map((image, index) => {
        const handleClick = () => setActiveIndex(index);
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setActiveIndex(index);
          }
        };

        image.setAttribute('role', 'button');
        image.setAttribute('tabindex', '0');
        image.setAttribute('aria-label', image.alt ? `Enlarge image: ${image.alt}` : 'Enlarge image');
        image.classList.add('lightbox-trigger');
        image.addEventListener('click', handleClick);
        image.addEventListener('keydown', handleKeyDown);

        return () => {
          image.removeEventListener('click', handleClick);
          image.removeEventListener('keydown', handleKeyDown);
          image.removeAttribute('role');
          image.removeAttribute('tabindex');
          image.removeAttribute('aria-label');
          image.classList.remove('lightbox-trigger');
        };
      });

      removeEnhancements = () => cleanups.forEach((cleanup) => cleanup());
    };

    enhanceImages();
    mediaQuery.addEventListener('change', enhanceImages);

    return () => {
      mediaQuery.removeEventListener('change', enhanceImages);
      removeEnhancements();
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    const dialog = dialogRef.current;
    if (!dialog || activeIndex === null || dialog.open) return;

    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }, [activeIndex]);

  // Runs for every way of closing: Escape, the close button, or a click outside the photo.
  const handleDialogClose = () => {
    const lastIndex = activeIndexRef.current;
    setActiveIndex(null);
    document.documentElement.style.removeProperty('overflow');
    if (lastIndex !== null) imageElementsRef.current[lastIndex]?.focus();
  };

  const closeViewer = () => {
    dialogRef.current?.close();
  };

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index === null ? index : (index - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? index : (index + 1) % images.length));
  }, [images.length]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeViewer();
  };

  const activeImage = activeIndex === null ? undefined : images[activeIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <>
      <div ref={containerRef} className={className}>
        {children}
      </div>

      <dialog
        ref={dialogRef}
        onClose={handleDialogClose}
        onKeyDown={handleDialogKeyDown}
        aria-label="Image viewer"
        className="lightbox m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-black/95"
      >
        {activeImage ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-24 py-12" onClick={handleBackdropClick}>
            {/* The web-sized copy is already optimised and cached from the page, so a plain img is enough. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[calc(100vh-9rem)] max-w-full rounded-md object-contain" />
            {hasMultipleImages ? (
              <p className="font-mono text-sm tabular-nums text-white/60">
                {activeIndex! + 1} / {images.length}
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={closeViewer}
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20"
          aria-label="Close image viewer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {hasMultipleImages ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
