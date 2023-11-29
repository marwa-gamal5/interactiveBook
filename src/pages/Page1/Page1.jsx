import React from 'react'
import './page1.css'
import brush from '../../assets/brush.svg';
import circle from '../../assets/circle.svg';
import eraser from '../../assets/eraser.svg';
import rectangle from '../../assets/rectangle.svg';
import triangle from '../../assets/triangle.svg';

function page1() {
  return (
    <>
     <div>

        <title>Drawing App</title>
        {/* https://github.com/johirulkhalid/Drawing-or-painting-App */}
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
                <img src={circle} alt="circle" />
                  <span>Circle</span>
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
            <canvas />
          </section>
        </div>
      </div>
    </>
  )
}export default page1
