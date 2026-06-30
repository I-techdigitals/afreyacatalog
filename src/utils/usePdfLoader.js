import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// How many pages to render immediately before showing the book
const EAGER_PAGES = 4;
// Render scale — 1.5 is a good balance of quality vs speed
const RENDER_SCALE = 1.5;

const renderPage = async (page) => {
  const viewport = page.getViewport({ scale: RENDER_SCALE });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas.toDataURL('image/jpeg', 0.85);
};

export const usePdfLoader = (pdfUrl) => {
  const [pdfImages, setPdfImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 550, height: 733, isLandscape: false });
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const loadPdf = async () => {
      try {
        setLoading(true);
        const pdf = await pdfjsLib.getDocument({ url: encodeURI(pdfUrl) }).promise;
        const numPages = pdf.numPages;

        // --- Step 1: Render the first EAGER_PAGES quickly so the book appears fast ---
        const eagerImages = [];
        for (let i = 1; i <= Math.min(EAGER_PAGES, numPages); i++) {
          const page = await pdf.getPage(i);

          if (i === 1) {
            const base = page.getViewport({ scale: 1.0 });
            const isLandscape = base.width > base.height;
            if (isMountedRef.current) {
              setDimensions({
                width: isLandscape ? base.width / 2 : base.width,
                height: base.height,
                isLandscape,
              });
            }
          }

          eagerImages.push(await renderPage(page));
        }

        if (!isMountedRef.current) return;
        // Fill remaining slots with null placeholders so the book renders immediately
        const initialImages = [
          ...eagerImages,
          ...Array(numPages - eagerImages.length).fill(null),
        ];
        setPdfImages([...initialImages]);
        setLoading(false);

        // --- Step 2: Render remaining pages in the background, one by one ---
        for (let i = EAGER_PAGES + 1; i <= numPages; i++) {
          if (!isMountedRef.current) break;
          const page = await pdf.getPage(i);
          const img = await renderPage(page);
          if (!isMountedRef.current) break;
          // Replace the null placeholder with the real image
          setPdfImages(prev => {
            const next = [...prev];
            next[i - 1] = img;
            return next;
          });
        }
      } catch (err) {
        console.error('Error loading PDF:', err);
        if (isMountedRef.current) {
          setError(err);
          setLoading(false);
        }
      }
    };

    if (pdfUrl) loadPdf();
    return () => { isMountedRef.current = false; };
  }, [pdfUrl]);

  return { pdfImages, loading, error, dimensions };
};
