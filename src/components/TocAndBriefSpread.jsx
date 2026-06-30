import React from 'react';

export const TocPage = () => {
  const items = [
    { label: 'About Us', page: '01' },
    { label: 'Catalog Overview', page: '01' },
    { label: 'Living Room Collection', page: '01' },
    { label: 'Dining Room Collection', page: '01' },
    { label: 'Bedroom Collection', page: '01' },
    { label: 'Office Furniture', page: '01' },
    { label: 'Customization Option', page: '01' },
    { label: 'Testimony', page: '01' },
    { label: 'Information', page: '01' },
  ];

  return (
    <div className="catalog-page">
      <div style={{ marginTop: '100px', marginLeft: '50px' }}>
        <h1 className="catalog-heading">Table Of Content</h1>
        <p className="catalog-subheading">Explore Our Furniture Collections & Features</p>

        <div className="toc-list">
          {items.map((item, idx) => (
            <div className="toc-item" key={idx}>
              <span className="toc-label">{item.label}</span>
              <span className="toc-leader"></span>
              <span className="toc-page">{item.page}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BriefPage = () => {
  return (
    <div className="catalog-page" style={{ justifyContent: 'center', padding: '100px' }}>
      <h1 className="catalog-heading" style={{ marginBottom: '40px' }}>Our Brief</h1>
      
      <p className="brief-text">
        At reallygreatsite, we aim to design furniture that blends timeless style with everyday function. This project focuses on clean lines, quality craftsmanship, and sustainable materials to create beautiful and practical pieces. Each design reflects our commitment to durability, comfort, and aesthetic harmony.
      </p>
      
      <p className="brief-text" style={{ marginTop: '20px' }}>
        This minimalist design approach guides our creative process. We're designing for a modern, style-aware audience seeking furniture that fits seamlessly into residential, commercial, or hospitality spaces. Every piece will align with your brand's identity, delivering a cohesive and purposeful collection.
      </p>
    </div>
  );
};
