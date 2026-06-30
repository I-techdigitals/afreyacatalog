import React from 'react';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

export const NavigationOverlay = ({ currentPage, totalPages, onNext, onPrev, onFullscreen }) => {
  return (
    <div className="nav-overlay">
      <button className="nav-btn" onClick={onPrev} disabled={currentPage === 0}>
        <ChevronLeft size={24} />
      </button>
      
      <div className="nav-status">
        {currentPage === 0 ? 'Cover' : `Page ${currentPage} of ${totalPages - 1}`}
      </div>
      
      <button className="nav-btn" onClick={onNext} disabled={currentPage >= totalPages - 1}>
        <ChevronRight size={24} />
      </button>

      <button className="nav-btn" onClick={onFullscreen} title="Toggle Fullscreen">
        <Maximize size={20} />
      </button>
    </div>
  );
};
