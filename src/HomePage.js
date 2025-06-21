import React, { useState, useEffect, useRef } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

// path data for background sketch
  const pathDataList = [
      "M 121.5,-0.5 C 126.5,-0.5 131.5,-0.5 136.5,-0.5C 141.32,0.486525 146.32,1.15319 151.5,1.5C 151.5,2.83333 151.5,4.16667 151.5,5.5C 148.221,4.50782 144.888,4.34115 141.5,5C 176.679,22.3429 200.679,49.5096 213.5,86.5C 212.036,85.5946 210.702,85.5946 209.5,86.5C 195.054,46.8863 168.221,19.2196 129,3.5C 95.7163,16.2874 71.2163,38.6207 55.5,70.5C 54.2652,70.7214 53.2652,71.3881 52.5,72.5C 51.8165,72.1373 51.1499,71.8039 50.5,71.5C 64.9507,41.8825 86.9507,19.7158 116.5,5C 86.5537,7.64108 60.887,19.4744 39.5,40.5C 38.609,39.8902 37.609,39.5569 36.5,39.5C 52.5814,22.1086 72.2481,10.2752 95.5,4C 104.255,2.15292 112.921,0.652923 121.5,-0.5 Z",
      "M 151.5,1.5 C 195.843,10.8576 227.843,35.8576 247.5,76.5C 246.9,77.9002 245.9,78.9002 244.5,79.5C 225.959,39.304 194.959,14.6373 151.5,5.5C 151.5,4.16667 151.5,2.83333 151.5,1.5 Z",
      "M 36.5,39.5 C 37.609,39.5569 38.609,39.8902 39.5,40.5C 11.2226,70.6667 -0.444114,106.333 4.5,147.5C 2.82124,147.285 1.82124,147.952 1.5,149.5C 0.833333,146.5 0.166667,143.5 -0.5,140.5C -0.5,133.167 -0.5,125.833 -0.5,118.5C 2.40748,87.6881 14.7408,61.3548 36.5,39.5 Z",
      "M 55.5,70.5 C 52.4506,76.6414 49.7839,82.9747 47.5,89.5C 68.7831,91.8159 88.4498,98.4825 106.5,109.5C 105.448,109.351 104.448,109.517 103.5,110C 104.252,110.671 104.586,111.504 104.5,112.5C 85.8161,101.076 65.4828,94.7422 43.5,93.5C 44.6862,85.7961 47.0195,78.4628 50.5,71.5C 51.1499,71.8039 51.8165,72.1373 52.5,72.5C 53.2652,71.3881 54.2652,70.7214 55.5,70.5 Z",
      "M 247.5,76.5 C 253.221,89.7233 256.887,103.39 258.5,117.5C 258.5,125.5 258.5,133.5 258.5,141.5C 251.364,193.429 223.697,229.762 175.5,250.5C 175.737,249.209 175.404,248.209 174.5,247.5C 225.026,224.591 252.026,185.258 255.5,129.5C 255.144,112.046 251.477,95.3795 244.5,79.5C 245.9,78.9002 246.9,77.9002 247.5,76.5 Z",
      "M 106.5,109.5 C 116.491,116.174 126.158,123.174 135.5,130.5C 134.603,131.598 133.77,131.598 133,130.5C 131.961,131.244 131.461,132.244 131.5,133.5C 113.112,123.278 93.2784,118.278 72,118.5C 61.74,118.637 51.5733,119.637 41.5,121.5C 40.243,154.387 49.243,184.054 68.5,210.5C 67.7659,211.708 67.4326,213.041 67.5,214.5C 45.7899,186.353 36.1233,154.353 38.5,118.5C 65.024,112.655 91.1906,113.989 117,122.5C 117.5,122.333 118,122.167 118.5,122C 113.952,118.612 109.286,115.445 104.5,112.5C 104.586,111.504 104.252,110.671 103.5,110C 104.448,109.517 105.448,109.351 106.5,109.5 Z",
      "M 213.5,86.5 C 219.216,104.053 220.883,121.886 218.5,140C 192.182,145.512 166.182,144.345 140.5,136.5C 140.167,135.167 139.833,135.167 139.5,136.5C 138.577,135.697 137.577,135.53 136.5,136C 137.337,137.011 137.67,138.178 137.5,139.5C 135.167,137.833 133.167,135.833 131.5,133.5C 131.461,132.244 131.961,131.244 133,130.5C 133.77,131.598 134.603,131.598 135.5,130.5C 161.498,140.666 188.165,142.833 215.5,137C 217.162,119.789 215.162,102.956 209.5,86.5C 210.702,85.5946 212.036,85.5946 213.5,86.5 Z",
      "M 139.5,136.5 C 139.833,136.5 140.167,136.5 140.5,136.5C 161.548,153.914 185.881,163.414 213.5,165C 214.059,165.725 214.392,166.558 214.5,167.5C 206.203,195.931 190.537,219.431 167.5,238C 159.943,243.61 151.943,248.443 143.5,252.5C 142.778,252.082 142.278,251.416 142,250.5C 140.989,251.337 139.822,251.67 138.5,251.5C 173.574,234.103 197.574,206.77 210.5,169.5C 183.219,166.35 158.886,156.35 137.5,139.5C 137.67,138.178 137.337,137.011 136.5,136C 137.577,135.53 138.577,135.697 139.5,136.5 Z",
      "M 4.5,147.5 C 11.4168,188.039 32.4168,218.706 67.5,239.5C 67.7373,240.791 67.404,241.791 66.5,242.5C 37.9382,227.099 18.1048,204.099 7,173.5C 4.2177,165.705 2.38437,157.705 1.5,149.5C 1.82124,147.952 2.82124,147.285 4.5,147.5 Z",
      "M 68.5,210.5 C 84.503,230.936 104.67,245.936 129,255.5C 132.115,254.025 135.282,252.692 138.5,251.5C 139.822,251.67 140.989,251.337 142,250.5C 142.278,251.416 142.778,252.082 143.5,252.5C 143.082,253.222 142.416,253.722 141.5,254C 142.5,254.167 143.5,254.333 144.5,254.5C 154.664,252.792 164.664,250.459 174.5,247.5C 175.404,248.209 175.737,249.209 175.5,250.5C 165.267,253.974 154.934,256.641 144.5,258.5C 134.167,258.5 123.833,258.5 113.5,258.5C 96.9049,255.968 81.2382,250.635 66.5,242.5C 67.404,241.791 67.7373,240.791 67.5,239.5C 82.7473,248.083 99.0806,252.917 116.5,254C 97.0368,244.702 80.7035,231.536 67.5,214.5C 67.4326,213.041 67.7659,211.708 68.5,210.5 Z"
    ];



// compute bounding box of paths
const getBBox = dataList => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  dataList.forEach(d => {
    // extract numbers
    const nums = d.match(/-?\d+\.?\d*/g)?.map(Number) || [];
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i], y = nums[i+1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  });
  return { minX, minY, width: maxX - minX, height: maxY - minY };
};

const Background = () => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { minX, minY, width, height } = getBBox(pathDataList);
    svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    const rc = rough.svg(svg);
    pathDataList.forEach(d => {
      const shape = rc.path(d, { stroke: '#333', strokeWidth: 1, roughness: 1.2, fill: 'none' });
      svg.appendChild(shape);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
    
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}
    />
  );
};

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [modal, setModal] = useState({ open: false, title: '' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: isMobile ? 'auto' : '100vh',
    margin: 0,
    overflowY: isMobile ? 'auto' : 'hidden',
    filter: modal.open ? 'blur(4px)' : 'none', // blur background when modal open
  };

  const contentWrapperStyle = {
    position: 'relative',
    width: isMobile ? '100vw' : '90vmin',
    height: isMobile ? 'auto' : '90vmin',
  };

  const pageTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'normal',
    margin: 0,
    marginBottom: '10px',
    marginLeft: '10px',
    zIndex: 1,
  };

  const gridStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gridAutoRows: '1fr',
    gap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    zIndex: 1,
  };

  const items = [
    { id: 1, title: 'APIE MUS' },
    { id: 2, title: 'IŠMANŪS NAMAI' },
    { id: 3, title: 'APŠVIETIMO PROJEKTAI' },
    { id: 4, title: 'ELEKTROS PROJEKTAI' },
    { id: 5, title: 'PROGRAMAVIMAS' },
    { id: 6, title: 'TECHNINĖ APŽIŪRA' },
    { id: 7, title: 'KNX SISTEMŲ APTARNAVIMAS' },
    { id: 8, title: 'D.U.K.' },
    { id: 9, title: 'KONTAKTAI' },
  ];

  return (
    <>
      <div style={containerStyle}>
        <Background />
        <div style={contentWrapperStyle}>
          <h2 style={pageTitleStyle}>ELEKTROS ARCHITEKTŪRA</h2>
          <div style={gridStyle}>
            {items.map(item => (
              <div key={item.id} style={{ ...cellWrapperStyle }}>
                <div style={titleContainerStyle}><h3 style={titleStyle}>{item.title}</h3></div>
                <div style={buttonContainerStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => setModal({ open: true, title: item.title })}
                  >
                    <img src={`${item.id}.svg`} alt={item.title} style={imageStyle} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal.open && (
        <div style={modalOverlayStyle} onClick={() => setModal({ open: false, title: '' })}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h3 style={modalTitleStyle}><b>{modal.title}</b></h3>
            <hr></hr>
            <div style={modalContentStyle}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
           
          </div>
        </div>
      )}
    </>
  );
};

// Shared styles for cells and modal
const cellWrapperStyle = {
  width: '100%', aspectRatio: '1 / 1', border: '2px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'stretch', boxSizing: 'border-box', padding: '0', background: 'transparent',
};
const titleContainerStyle = { padding: '10px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center' };
const titleStyle = { fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'left', margin: 0 };
const buttonContainerStyle = { flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const buttonStyle = { width: '60%', height: '60%', padding: 0, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 25%, #d9d9d9 75%, #f0f0f0 100%)', borderRadius: '8px', boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.8), inset -1px -1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative' };
const imageStyle = { width: '30%', height: '30%', objectFit: 'contain', opacity: 0.3, mixBlendMode: 'multiply', filter: 'brightness(0.6)' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 };
const modalStyle = {
  // aluminum background gradient
  background: 'linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 25%, #d9d9d9 75%, #f0f0f0 100%)',
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '600px',
  height: '80%',
  maxHeight: '800px',
  // stronger inset metallic shading plus subtle outer drop shadow
  boxShadow: 'inset 2px 2px 6px rgba(255,255,255,0.9), inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.3)',
  position: 'relative',
};
const modalTitleStyle = { margin: '0 0 10px 0', fontSize: '1.2rem' };
const modalContentStyle = { maxHeight: '200px', overflowY: 'auto', marginTop: '10px'};

export default HomePage;
