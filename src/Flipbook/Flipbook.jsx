
import React, { useState, useEffect } from "react";
import $ from "jquery";
import Page1 from "../pages/Page1/Page1";
import Page2 from "../pages/page2/Page2";
import Page3 from "../pages/page3/Page3";
import Page4 from "../pages/page 4/Page4";
import Page5 from "../pages/page5/Page5";
import Page6 from "../pages//page6/Page6";

import Page7 from "../pages/Page7/Page7";
import Page8 from "../pages/page8/Page8";
import Page9 from "../pages/page9/Page9";
import Page10 from "../pages/page10/Page10";
import Page11 from "../pages/page11/Page11";
import Page12 from "../pages//page12/Page12";


import Page13 from "../pages/Page13/Page13";
import Page14 from "../pages/page14/Page14";
import Page15 from "../pages/page15/Page15";
import Page16 from "../pages/page16/Page16";
import Page17 from "../pages/page17/Page17";


import './Flipbook.css';
import  "turn.js";



const Turn = ({ style = {}, className = "", options = {}, children }) => {
  const [el, setEl] = useState(null);

  useEffect(() => {
    if (el) {
      $(el).turn({ ...options });
    }
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      if (el) {
        $(el)
          .turn("destroy")
          .remove();
      }
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [el]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      $(el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(el).turn("next");
    }

  };

  return (
    <div
      className={className}
      style={{ ...style }}
      ref={(el) => setEl(el)}
    >
      {children}
    </div>
  );
};

// Function to calculate dynamic width based on screen size
const calculateWidth = () => {
    const screenWidth = window.innerWidth;
console.log('ddddddddddddddddddddddd',screenWidth)
    // Adjust these values based on your design requirements
   if (screenWidth < 992) {
        return 800; // Set the width for medium screens
    } else {
        return 1125; // Default width for larger screens
    }
};

const dynamicWidth = calculateWidth();


const options = {
   width: dynamicWidth,

  //  height: 700,
   height: 800,
  autoCenter: true,
  display: 'single',
  acceleration: true,
  elevation: 50,

  gradients: !$.isTouch,
  //  direction: "ltr",
 direction: "rtl", // Set the direction to right-to-left
  when: {
    turned: function (e, page) {
      console.log("Current view: ", $(this).turn("view"));
      console.log("Current page number: ", page);
    },
  },
};


const Flipbook = () => {
  return (
    <>
    <div className="conteint p-5 d-flex justify-content-center align-items-center"    >
    <Turn options={options} className="magazine " >
         <Page1 />
     <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <Page8/>
      <Page9 />
      <Page10 />
      <Page11/>
      <Page12 />
      <Page13 />
      <Page14 />
      <Page15 />
      <Page16 />
      <Page17 />
      
     
      
    </Turn>
    </div>
    </>
  );
};

export default Flipbook;
