import React from 'react';

const ProductItem = ({ title, imageSrc }) => (
  <div className="product-item">
    <h3 className="product-title" style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>{title}</h3>
    <div className="product-layout">
      <img src={imageSrc} alt={title} className="product-image" />
      <div className="product-specs">
        <div className="spec-row" style={{ borderTop: 'none' }}>
          <span className="spec-label">Style</span>
          <span className="spec-value">Modern Minimalist</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Material</span>
          <span className="spec-value">Metal, Fabric, Wood</span>
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
    </div>
  </div>
);

export const ProductGridPage = () => {
  return (
    <div className="catalog-page" style={{ padding: '40px 60px' }}>
      <div className="product-grid">
        <ProductItem title="Dining Room" imageSrc="/images/catalog_page_1_1782407952408.png" />
        <ProductItem title="Living Room" imageSrc="/images/catalog_page_2_1782407967875.png" />
        <ProductItem title="Bed Room" imageSrc="/images/catalog_page_3_1782408010192.png" />
        <ProductItem title="Kitchen Room" imageSrc="/images/catalog_page_1_1782407952408.png" />
      </div>
    </div>
  );
};
