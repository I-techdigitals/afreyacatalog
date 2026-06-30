import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export const usePdfLoader = (pdfUrl) => {
  const [pdfImages, setPdfImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 550, height: 733, isLandscape: false });

  useEffect(() => {
    let isMounted = true;

    const loadPdf = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument({ url: encodeURI(pdfUrl) });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const pageImages = [];

        let pdfDimensions = { width: 550, height: 733, isLandscape: false };

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });

          if (i === 1) {
            const baseViewport = page.getViewport({ scale: 1.0 });
            const isLandscape = baseViewport.width > baseViewport.height;
            pdfDimensions = {
              // single page width = half of landscape spread
              width: isLandscape ? baseViewport.width / 2 : baseViewport.width,
              height: baseViewport.height,
              isLandscape,
            };
          }

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

          // Return the FULL spread image — no canvas splitting.
          // The BookViewer will use CSS to show left/right halves correctly.
          pageImages.push(canvas.toDataURL('image/jpeg', 0.92));
        }

        if (isMounted) {
          setDimensions(pdfDimensions);
          setPdfImages(pageImages);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading PDF:', err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    if (pdfUrl) loadPdf();
    return () => { isMounted = false; };
  }, [pdfUrl]);

  return { pdfImages, loading, error, dimensions };
};
