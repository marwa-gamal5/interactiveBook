import React from 'react'
import image from '../../assets/Book/6.jpg';
import image2 from '../../assets/Book/7.jpg';

function page4() {
  return (
    <>
        <div style={{ direction: "ltr" }}>
            <div className={`d-flex w-100 flex-row p-0 h-100`}>
                <img src={image2} alt="page3" className={`w-50 h-100`}/>
                <img src={image} alt="page3" className={`w-50 h-100`}/>
            </div>
        </div>
    </>
  )
}export default page4
