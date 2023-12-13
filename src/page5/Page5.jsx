import React, { useState, useEffect } from 'react';
import styles from './page5.module.css';

function Page5() {
  const [radius, setRadius] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Always draw the circle from the initial center point
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }, [radius, isDrawing, startX, startY]);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const canvas = document.getElementById('myCanvas');
    const rect = canvas.getBoundingClientRect();

    // Set the initial center of the circle to the point where the user clicks
    setStartX(event.clientX - rect.left);
    setStartY(event.clientY - rect.top);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) {
      return;
    }
    const canvas = document.getElementById('myCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate the distance from the initial center to the current mouse position
    const newRadius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
    setRadius(newRadius);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <div>
        <h1 style={{ backgroundColor: 'dodgerblue' }}>page5</h1>
        <div
          className='d-flex align-items-center justify-content-center'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <canvas id='myCanvas' className={`${styles.canvas} w-100 h-100`}>
            Your browser does not support the HTML canvas tag.
          </canvas>
        </div>
      </div>
    </>
  );
}

export default Page5;
