
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
import Page18 from "../pages//page18/Page18";

import Page19 from "../pages/Page19/Page19";
import Page20 from "../pages/page20/Page20";
import Page21 from "../pages/page21/Page21";
import Page22 from "../pages/page22/Page22";
import Page23 from "../pages/page23/Page23";
import Page24 from "../pages//page24/Page24";

import Page25 from "../pages/Page25/Page25";
import Page26 from "../pages/page26/Page26";
import Page27 from "../pages/page27/Page27";
import Page28 from "../pages/page28/Page28";
import Page29 from "../pages/page29/Page29";
import Page30 from "../pages//page30/Page30";

import Page31 from "../pages//page31/Page31";
import Page32 from "../pages//page32/Page32";
import Page33 from "../pages//page33/Page33";
import Page34 from "../pages//page34/Page34";
import Page35 from "../pages//page35/Page35";

import styles from './Flipbook.module.css';
import "turn.js";



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

const options = {
   width: 1125,
  //  height: 700,
   height: 800,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,

  gradients: !$.isTouch,
  //  direction: "ltr",
 direction: "rtl", // Set the direction to right-to-left
  when: {
    turned: function (e, page) {
      console.log("Current view: ", $(this).turn("view"));
    },
  },
};


const Flipbook = () => {
  return (
    <>
    <div className={`${styles.conteint}  p-5 d-flex justify-content-center align-items-center`}    >
    <Turn options={options} className="magazine "  >
    
     <Page1 />
          
     <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      {/* <Page8/> */}
      <Page9 />
      <Page10 />
      <Page11/>
      <Page12 />
      <Page13 />
      <Page14 />
      <Page15 />
      <Page16 />
      <Page17 />
      <Page18 />
      <Page19 />
      <Page20 />
      <Page21 />
      <Page22 />
      <Page23 />
      <Page24 />
      <Page25 />
      <Page26 />
      <Page27 />
      <Page28 />
      <Page29 />
      <Page30 />
      <Page31 />
      <Page32 />
    
      <Page34 />
     
      
    </Turn>
    </div>
    </>
  );
};

export default Flipbook;
