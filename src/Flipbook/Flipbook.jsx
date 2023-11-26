
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Page1 from "../pages/page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import Page4 from "../pages/Page4";
import Page5 from "../pages/Page5";
import Page6 from "../pages/Page6";
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
  width: 800,
  height: 600,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function (e, page) {
      console.log("Current view: ", $(this).turn("view"));
    },
  },
};


const Flipbook = () => {
  return (
    <Turn options={options} className="magazine">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
    </Turn>
  );
};

export default Flipbook;
