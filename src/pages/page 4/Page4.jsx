import React, { useState } from 'react';
import image from '../../assets/Book MathSemster/4.jpg';
import styles from './page4.module.css';
function Page4() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left ;
    const y = event.clientY - rect.top ;
    setCirclePosition({ x, y });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* <div  className={`${styles.imageborder} `} style={{position: 'absolute' ,width:'90%',height:'30%', border: '2px solid red',zIndex:'99999'}} onClick={handleImageClick}  ></div> */}
      <div  className={`${styles.imageborder} `} style={{position: 'absolute' ,width:'90%', border: '2px solid red',height:'30%',zIndex:'99999'}} onClick={handleImageClick}  >
        {circlePosition.x !== 0 && circlePosition.y !== 0 && (
          <div
            style={{
              position: 'absolute',
              top: circlePosition.y,
              left: circlePosition.x,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '2px solid red',
            }}
          ></div>
        )}
      </div>
      <img src={image} alt="page4" style={{ position: 'relative'}}/>
    </div>
  );
}

export default Page4;
