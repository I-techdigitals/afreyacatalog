import React, { useState, useEffect } from 'react';
import { RotateCw, X } from 'lucide-react';

export const OrientationPrompt = () => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const checkOrientation = () => {
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    setIsMobilePortrait(isMobile && isPortrait);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isMobilePortrait || dismissed) return null;

  const handleRotate = async () => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        // Attempt orientation lock (requires fullscreen on many mobile browsers)
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen().catch(() => {});
        }
        await screen.orientation.lock('landscape');
      } else {
        alert("Auto-rotate is not fully supported by your browser. Please turn your device sideways manually.");
      }
    } catch (error) {
      console.warn("Could not lock orientation automatically:", error);
      alert("Please enable auto-rotate and turn your device sideways.");
    }
  };

  return (
    <div className="orientation-overlay">
      <div className="orientation-modal">
        <button className="orientation-close" onClick={() => setDismissed(true)} aria-label="Dismiss">
          <X size={18} />
        </button>
        
        <div className="orientation-brand">
          <img src="/images/afreya-logo.svg" alt="Afreya Logo" className="orientation-logo" />
        </div>

        <div className="orientation-icon-wrapper">
          <RotateCw className="orientation-icon" size={40} />
        </div>

        <h2>Landscape Recommended</h2>
        <p>
          For the best reading experience of double-page spreads, please rotate your screen.
        </p>

        <button className="orientation-btn" onClick={handleRotate}>
          Rotate to Landscape
        </button>
        
        <button className="orientation-skip" onClick={() => setDismissed(true)}>
          Continue in Portrait
        </button>
      </div>
    </div>
  );
};
