import React from 'react'
import image from '../../assets/Book/33.jpg';
import image2 from '../../assets/Book/34.jpg';

function page17() {
  return (
    <>
        <div style={{ direction: "ltr" }}>
        <div className={`d-flex w-100 flex-row p-0 h-100`}>
            <img src={image2}  className={`w-50 h-100`}/>
            <img src={image}  className={`w-50 h-100`}/>
        </div>
        </div>
    </>
  )
}export default page17
