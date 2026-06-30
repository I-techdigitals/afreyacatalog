import React from 'react';

export const ContactSpreadLeft = () => {
  return (
    <div className="catalog-page" style={{ justifyContent: 'center', padding: '60px', backgroundColor: '#fdfcfb' }}>
      <h1 className="catalog-heading" style={{ fontSize: '3rem', marginBottom: '20px' }}>Get in Touch</h1>
      <p className="brief-text" style={{ marginBottom: '40px' }}>
        We are here to help you design the perfect space. Whether you are looking for custom furniture or have questions about our catalog, reach out to our team of specialists.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444', marginBottom: '5px' }}>Email Us</h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#888' }}>hello@luminousfurniture.com</p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444', marginBottom: '5px' }}>Call Us</h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#888' }}>+1 (800) 555-0199</p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444', marginBottom: '5px' }}>Visit Studio</h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#888' }}>123 Minimalist Avenue<br/>Design District, NY 10012</p>
        </div>
      </div>
    </div>
  );
};

export const ContactSpreadRight = () => {
  return (
    <div className="catalog-page" style={{ justifyContent: 'center', padding: '60px', backgroundColor: '#fff' }}>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: '#333', marginBottom: '30px' }}>Send an Inquiry</h3>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
        <div>
          <input 
            type="text" 
            placeholder="Full Name" 
            style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid #ddd', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', backgroundColor: 'transparent' }} 
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email Address" 
            style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid #ddd', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', backgroundColor: 'transparent' }} 
          />
        </div>
        <div>
          <textarea 
            placeholder="How can we help you?" 
            rows="4" 
            style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid #ddd', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', backgroundColor: 'transparent', resize: 'none' }} 
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#333', color: '#fff', border: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', cursor: 'pointer', alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};
