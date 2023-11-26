
// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import $ from "jquery";
// import "turn.js";

// import "./styles.css";

// const Turn = ({ style = {}, className = "", options = {}, children }) => {
//   const [el, setEl] = useState(null);

//   useEffect(() => {
//     if (el) {
//       $(el).turn({ ...options });
//     }
//     document.addEventListener("keydown", handleKeyDown, false);
//     return () => {
//       if (el) {
//         $(el)
//           .turn("destroy")
//           .remove();
//       }
//       document.removeEventListener("keydown", handleKeyDown, false);
//     };
//   }, [el]);

//   const handleKeyDown = (event) => {
//     if (event.keyCode === 37) {
//       $(el).turn("previous");
//     }
//     if (event.keyCode === 39) {
//       $(el).turn("next");
//     }
//   };

//   return (
//     <div
//       className={className}
//       style={{ ...style }}
//       ref={(el) => setEl(el)}
//     >
//       {children}
//     </div>
//   );
// };

// const options = {
//   width: 800,
//   height: 600,
//   autoCenter: true,
//   display: "double",
//   acceleration: true,
//   elevation: 50,
//   gradients: !$.isTouch,
//   when: {
//     turned: function (e, page) {
//       console.log("Current view: ", $(this).turn("view"));
//     },
//   },
// };

// const pages = [
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg",
// ];

// const App = () => {
//   return (
//     <Turn options={options} className="magazine">
//       {pages.map((page, index) => (
//         <div key={index} className="page">
//           <img src={page} alt={`Page ${index + 1}`} />
//         </div>
//       ))}
//     </Turn>
//   );
// };

// export default App;
