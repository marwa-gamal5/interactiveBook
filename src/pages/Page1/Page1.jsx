import React from 'react'
import './page1.css'
import image from '../../assets/Book/1.jpg';
import image2 from '../../assets/Book/34.jpg';
import image3 from '../../assets/Book/34.jpg'

function page1() {
  return (
    <>
 <div style={{ direction: "ltr" }}>
 {/* <i class="fa-solid fa-qrcode"></i> */}
     <div className={`d-flex w-100 flex-row p-0 h-100`}>
     <img src={image} alt="page1" className={`w-100 h-100`} />
         <img src={image2} alt="page1" className={`w-50 h-100`}/>
         
     </div>

</div>
    </>
  )
}export default page1
