import React, { useRef, useEffect } from 'react';
import './page1.css';
import brush from '../../assets/brush.svg';
import circle from '../../assets/circle.svg'; // Renamed to avoid conflicts with variable names
import eraser from '../../assets/eraser.svg';
import rectangle from '../../assets/rectangle.svg';
import triangle from '../../assets/triangle.svg';

function Test() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Function to draw a circle
    const drawCircle = (x, y, radius) => {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.stroke();
      
    };

    // Function to handle the circle button click
    const handleCircleButtonClick = () => {
      // Example: Draw a circle at the center of the canvas with a radius of 20
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const radius = 20;

      drawCircle(centerX, centerY, radius);
    };

    // Attach the event listener to the circle button
    const circleButton = document.getElementById('circle');
    circleButton.addEventListener('click', handleCircleButtonClick);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      circleButton.removeEventListener('click', handleCircleButtonClick);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <>
     <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>

        <title>Drawing App</title>
       
        <div className="container">
          <section className="tools-board">
            <div className="row">
              <label className="title">Shapes</label>
              <ul className="options">
                <li className="option tool" id="rectangle">
                <img src={rectangle} alt="rectangle" />

                  
                  <span>Rectangle</span>
                </li>
                <li className="option tool" id="circle">
                <button style={{ backgroundcolor: 'red', border: 'none' }}>
                <img src={circle} alt="circle" />
                  <span style={{ color: 'red'}}>Circle</span>
                  </button>
                </li>
                <li className="option tool" id="triangle">
                <img src={triangle} alt="triangle" />
                  <span>Triangle</span>
                </li>
                <li className="option">
                  <input type="checkbox" id="fill-color" />
                  <label htmlFor="fill-color">Fill color</label>
                </li>  
              </ul>
            </div>
            <div className="row">
              <label className="title">Options</label>
              <ul className="options">
                <li className="option active tool" id="brush">
                <img src={brush} alt="brush" />
                  
                  <span>Brush</span>
                </li>
                <li className="option tool" id="eraser">
                <img src={eraser} alt="eraser" />

                  <span>Eraser</span>
                </li>
                <li className="option">
                  <input type="range" id="size-slider" min={1} max={30} defaultValue={5} />
                </li>  
              </ul>
            </div>
            <div className="row colors">
              <label className="title">Colors</label>
              <ul className="options">
                <li className="option" />
                <li className="option" />
                <li className="option selected" />
                <li className="option" />
                <li className="option">
                  <input type="color" id="color-picker" defaultValue="#0000ff" />
                </li>
              </ul>
            </div>
            <div className="row buttons">
              <button className="clear-canvas">Clear Canvas</button>
              <button className="save-img">Save as Image</button>
            </div>
          </section>
          <section className="drawing-board">
        <canvas ref={canvasRef} id="drawingCanvas" width={400} height={400} />
      </section>
        </div>
      </div>
    </>
  )
}
export default Test;
