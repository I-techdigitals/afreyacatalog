import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => (
  <div
    className={`page ${props.isLeft ? '-left' : '-right'}`}
    ref={ref}
  >
    {props.children}
    <div className="page-number">{props.number}</div>
  </div>
));



function useAdaptiveSize(dimensions) {
  const compute = () => {
    const isFullscreen = !!document.fullscreenElement;

    if (isFullscreen) {
      // In full screen, stretch the pages to cover the entire screen
      return {
        width: Math.floor(window.innerWidth / 2),
        height: Math.floor(window.innerHeight),
      };
    } else {
      // In unfull screen, maintain the PDF's native aspect ratio (fit)
      const availablePageWidth = window.innerWidth / 2;
      const availableHeight = window.innerHeight;
      const scale = Math.min(
        availablePageWidth / dimensions.width,
        availableHeight / dimensions.height
      );
      return {
        width: Math.floor(dimensions.width * scale),
        height: Math.floor(dimensions.height * scale),
      };
    }
  };

  const [size, setSize] = useState(compute);

  useEffect(() => {
    const update = () => setSize(compute());
    window.addEventListener('resize', update);
    document.addEventListener('fullscreenchange', update);
    return () => {
      window.removeEventListener('resize', update);
      document.removeEventListener('fullscreenchange', update);
    };
  }, [dimensions.width, dimensions.height]);

  return size;
}

export const BookViewer = React.forwardRef(({ pages, dimensions, onPageChange, catalogLinks = [] }, ref) => {
  if (!pages || pages.length === 0) return null;

  const { width, height } = useAdaptiveSize(dimensions);

  const bookPages = pages.map((pageContent, index) => {
    const isImage = typeof pageContent === 'string';
    // Even index = left page of a spread; odd index = right page
    const isLeft = index % 2 === 0;

    const linksForPage = catalogLinks.filter(l => l.pageIndex === index);

    return (
      <Page key={`page-${index}`} isLeft={isLeft} number={index + 1}>
        {pageContent === null ? (
          // Still loading — show a shimmer placeholder
          <div className="page-loading-shimmer" />
        ) : isImage ? (
          <img
            src={pageContent}
            alt={`Page ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          pageContent
        )}

        {linksForPage.map((link, i) => (
          <a
            key={`link-${i}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-link-hotspot"
            title={`View ${link.title} on website`}
            style={{
              position: 'absolute',
              top: link.rect.top,
              left: link.rect.left,
              width: link.rect.width,
              height: link.rect.height,
            }}
          />
        ))}
      </Page>
    );
  });

  return (
    <HTMLFlipBook
      width={width}
      height={height}
      size="fixed"
      minWidth={100}
      maxWidth={10000}
      minHeight={100}
      maxHeight={10000}
      maxShadowOpacity={0.35}
      showCover={false}        // ← false: always show 2 pages together, no single-page cover mode
      mobileScrollSupport={true}
      className="book-viewer"
      onFlip={onPageChange}
      ref={ref}
      useMouseEvents={true}
      drawShadow={false}
      flippingTime={900}
    >
      {bookPages}
    </HTMLFlipBook>
  );
});
