import React, { useState } from 'react';
import image from '../assets/Book MathSemster/4.jpg';

function Page4() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCirclePosition({ x, y });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={image} alt="page4" onClick={handleImageClick} />
      {circlePosition.x !== 0 && circlePosition.y !== 0 && (
        <div
          style={{
            position: 'absolute',
            top: circlePosition.y,
            left: circlePosition.x,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid red',
          }}
        ></div>
      )}
    </div>
  );
}

export default Page4;
