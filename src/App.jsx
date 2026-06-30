import React, { useRef, useState } from 'react';
import { BookViewer } from './components/BookViewer';
import { NavigationOverlay } from './components/NavigationOverlay';
import { ContactSpreadLeft, ContactSpreadRight } from './components/ContactSpread';
import { usePdfLoader } from './utils/usePdfLoader';
import { supabase } from './lib/supabase';
import './index.css';

// Fetch the public URL from your Supabase storage bucket
const { data } = supabase.storage.from('catalogpdf').getPublicUrl('catalog.pdf');
const PDF_URL = data.publicUrl;

// If you need to fallback to the local file before uploading, uncomment this:
// const PDF_URL = '/images/Beige Neutral Minimalist Furniture Catalog Presentation.pdf';

/**
 * LEFT half of a landscape spread.
 * The img is 200% wide, anchored left → only the left 50% is visible inside the clipping container.
 */
const SpreadLeft = ({ src }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#fff' }}>
    <img
      src={src}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '100%',
        objectFit: 'cover',  // prevents forceful stretch while covering full screen
      }}
    />
  </div>
);

/**
 * RIGHT half of a landscape spread.
 * The img is 200% wide, anchored right → only the right 50% is visible inside the clipping container.
 */
const SpreadRight = ({ src }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#fff' }}>
    <img
      src={src}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200%',
        height: '100%',
        objectFit: 'cover',  // prevents forceful stretch while covering full screen
      }}
    />
  </div>
);

function App() {
  const bookRef = useRef(null);
  const [page, setPage] = useState(0);
  const { pdfImages, loading, error, dimensions } = usePdfLoader(PDF_URL);

  const onPageChange = (e) => { setPage(e.data); };
  const nextButtonClick = () => { bookRef.current?.pageFlip().flipNext(); };
  const prevButtonClick = () => { bookRef.current?.pageFlip().flipPrev(); };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen?.();
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent-gold)' }}>Loading catalog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ color: 'red' }}>Error loading PDF: {error.message}</div>
      </div>
    );
  }

  const catalogPages = [];

  pdfImages.forEach((src, i) => {
    if (dimensions.isLandscape) {
      // Each landscape spread → left page + right page displayed together
      catalogPages.push(<SpreadLeft  key={`pdf-${i}-L`} src={src} />);
      catalogPages.push(<SpreadRight key={`pdf-${i}-R`} src={src} />);
    } else {
      catalogPages.push(src);
    }
  });

  catalogPages.push(<ContactSpreadLeft  key="contact-1" />);
  catalogPages.push(<ContactSpreadRight key="contact-2" />);

  // react-pageflip requires an even number of pages
  if (catalogPages.length > 2 && catalogPages.length % 2 !== 0) {
    catalogPages.splice(
      catalogPages.length - 1, 0,
      <div key="blank" style={{ width: '100%', height: '100%', backgroundColor: '#fff' }} />
    );
  }

  return (
    <>
      <BookViewer
        ref={bookRef}
        pages={catalogPages}
        dimensions={dimensions}
        onPageChange={onPageChange}
      />
      <NavigationOverlay
        currentPage={page}
        totalPages={catalogPages.length}
        onNext={nextButtonClick}
        onPrev={prevButtonClick}
        onFullscreen={toggleFullscreen}
      />
    </>
  );
}

export default App;
