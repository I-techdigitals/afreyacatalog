import React from 'react';

export const ProductHighlightPage = () => {
  return (
    <div className="catalog-page" style={{ padding: '60px 40px' }}>
      <div className="highlight-layout">
        {/* Left Side: Big Image */}
        <div style={{ flex: 1.2 }}>
          <img 
            src="/images/catalog_page_2_1782407967875.png" 
            alt="Highlight Product" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#f5f5f5' }} 
          />
        </div>

        {/* Right Side: Specs and Title */}
        <div className="highlight-sidebar" style={{ flex: 1 }}>
          <div>
            <h3 className="product-title" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Specification</h3>
            <div style={{ borderBottom: '1px solid #eee', marginBottom: '15px' }}></div>
            
            <div className="product-specs" style={{ marginBottom: '30px' }}>
              <div className="spec-row" style={{ borderTop: 'none' }}>
                <span className="spec-label">Style</span>
                <span className="spec-value">Modern Minimalist</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Material</span>
                <span className="spec-value">High Quality Metal</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Dimension</span>
                <span className="spec-value">14 x 6 x 20</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Weight</span>
                <span className="spec-value">2 - 4 lbs</span>
              </div>
            </div>

            <p className="brief-text" style={{ fontSize: '0.75rem', lineHeight: 1.6, marginBottom: '40px' }}>
              Designed for both home offices and professional spaces, each piece combines functionality with a modern aesthetic.
            </p>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <p className="catalog-subheading" style={{ margin: 0, fontSize: '0.75rem' }}>Minimalist</p>
              <h1 className="catalog-heading" style={{ fontSize: '3.5rem', letterSpacing: '-2px', marginTop: '5px' }}>Chair</h1>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <img src="/images/catalog_page_3_1782408010192.png" style={{ height: '120px', width: '100%', objectFit: 'cover', backgroundColor: '#f5f5f5' }} alt="Detail 1" />
              <img src="/images/catalog_page_1_1782407952408.png" style={{ height: '120px', width: '100%', objectFit: 'cover', backgroundColor: '#f5f5f5' }} alt="Detail 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
