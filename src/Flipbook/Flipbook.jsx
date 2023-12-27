
import { useState, useEffect } from "react";
import {OverlayTrigger} from 'react-bootstrap';
import $ from "jquery";
import Page1 from "../pages/Page1/Page1";
import Page2 from "../pages/page2/Page2";
import Page3 from "../pages/page3/Page3";
import Page4 from "../pages/page 4/Page4";
import Page5 from "../pages/page5/Page5";
import Page6 from "../pages//page6/Page6";

import Page7 from "../pages/page7/Page7";
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

import { useDispatch,useSelector } from "react-redux";
import {
    setTest,
    setPageNum,
    setLine,
    setText,
    setRec,
    setUndo,
    setRedo,
    setDraw,
    setDraw2,
    setClearAll,
    SetStopDraw,
    ChageColor
} from '../store/actions/dataAction1'
import './Flipbook.css';
import  "turn.js";
import styles from  './Flipbook.module.css'
// {*****************icons import*******************}
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {faT} from '@fortawesome/free-solid-svg-icons';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faPaintBrush} from '@fortawesome/free-solid-svg-icons';
import {faUndoAlt} from '@fortawesome/free-solid-svg-icons';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {faEraser} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {Tooltip} from "react-bootstrap";


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






function Flipbook () {

    const lineTooltip = <Tooltip id="tooltip-add-line">Line</Tooltip>;
    const circleTooltip = <Tooltip id="tooltip-add-circle">Circle</Tooltip>;
    const rectangleTooltip = <Tooltip id="tooltip-add-rectangle">Square</Tooltip>;
    const textTooltip = <Tooltip id="tooltip-add-text">Add text</Tooltip>;
    const drawTooltip = <Tooltip id="tooltip-draw">Freehand</Tooltip>;
    const draw2Tooltip = <Tooltip id="tooltip-draw2">Brush</Tooltip>;
    const undoTooltip = <Tooltip id="tooltip-undo">Undo</Tooltip>;
    const RedoTooltip = <Tooltip id="tooltip-undo">Redo</Tooltip>;
    const removeObject = <Tooltip id="tooltip-draw2">Remove Selected Object</Tooltip>;
    const clearAll = <Tooltip id="tooltip-undo">clear All</Tooltip>;
    const Save = <Tooltip id="tooltip-undo">Save</Tooltip>;
    const colorTooltip = <Tooltip id="tooltip-color">Select Color</Tooltip>;
    const [cropImage, setCropImage] = useState(true);

    // States for tracking button clicks
    const [isAddLineClicked, setAddLineClicked] = useState(false);
    const [isAddCircleClicked, setAddCircleClicked] = useState(false);
    const [isAddRectangleClicked, setAddRectangleClicked] = useState(false);
    const [isAddTextClicked, setAddTextClicked] = useState(false);
    const [isDrawClicked, setDrawClicked] = useState(false);
    const [isDraw2Clicked, setDraw2Clicked] = useState(false);
    const [isundoClicked, setundoClicked] = useState(false);
    const [isredoClicked, setredoClicked] = useState(false);
    const [isclearClicked, setclearClicked] = useState(false);
    const [isremoveSelectedObjectClicked, setremoveSelectedObjectClicked] = useState(false);
    const dispatch = useDispatch();
    const removeOne = useSelector((state) => state.data.removeone);


    const options = {
        width: 1000,
        height: 800,
        autoCenter: true,
        display: 'single',
        acceleration: true,
        elevation: 50,
        gradients: !$.isTouch,
        direction: "rtl",
        when: {
            turned: function (e, page) {
                console.log("Current view: ", $(this).turn("view"));
                console.log("Current page number: ", page);
                dispatch(setPageNum(page));

            },
        },
    };

  const handelcircle =()=>{
    const newRandomNumber = Math.floor(Math.random() * 100) + 1

    console.log("newRandomNumber= ",newRandomNumber)

     dispatch(setTest(newRandomNumber))

      setAddLineClicked(false);
      setAddCircleClicked(true);
      setAddRectangleClicked(false);
      setAddTextClicked(false);
      setDrawClicked(false);
      setDraw2Clicked(false);
      setundoClicked(false);
      setredoClicked(false);
      setclearClicked(false);
      setremoveSelectedObjectClicked(false);


  }

    const handeline =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        console.log("newRandomNumber= ",newRandomNumber)

        dispatch(setLine(newRandomNumber))

        setAddLineClicked(true);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);


    }
    const handetext =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        console.log("newRandomNumber= ",newRandomNumber)

        dispatch(setText(newRandomNumber))

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(true);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);


    }
    const handelRec =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        console.log("newRandomNumber= ",newRandomNumber)

        dispatch(setRec(newRandomNumber))

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(true);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);

    }
    const handelundo =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        console.log("newRandomNumber= ",newRandomNumber)

        dispatch(setUndo(newRandomNumber))



        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(true);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);


    }
    const handeRedo =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        console.log("newRandomNumber= ",newRandomNumber)

        dispatch(setRedo(newRandomNumber))

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(true);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);

    }
    const handedraw =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1
        console.log("newRandomNumber= ",newRandomNumber)
        dispatch(setDraw(newRandomNumber))

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(true);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);

    }
    const handedraw2 =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1
        console.log("newRandomNumber= ",newRandomNumber)
        dispatch(setDraw2(newRandomNumber))
        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(true);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);

    }
    const ClearAll =()=>{
        const newRandomNumber = Math.floor(Math.random() * 100) + 1
        console.log("newRandomNumber= ",newRandomNumber)
        dispatch(setClearAll(newRandomNumber))

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(true);
        setremoveSelectedObjectClicked(false);

    }
    const [removeOnee, setRemoveOne] = useState(false);
    const [buttonColor, setButtonColor] = useState('#dbdbdb');
    const toggleRemoveOne = () => {
        const newRandomNumber = Math.floor(Math.random() * 100) + 1

        dispatch(SetStopDraw(newRandomNumber))
        setButtonColor((prevColor) => (prevColor === '#dbdbdb' ? '#f9b331' : '#dbdbdb'));
        const updatedRemoveOne = !removeOnee;
        localStorage.setItem('removeOne', updatedRemoveOne.toString());
        setRemoveOne(updatedRemoveOne);


        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(true);

    };

    useEffect(() => {
        const storedRemoveOne = localStorage.getItem('removeOne');
        if (storedRemoveOne !== null) {
            setRemoveOne(storedRemoveOne === 'true');
        }
    }, []);

    const RemoveSelectedObject =()=>{
       const newRandomNumber = Math.floor(Math.random() * 100) + 1
       console.log("newRandomNumber= ",newRandomNumber)
      //  let getlocal=localStorage.getItem('removeOne')

        localStorage.setItem('removeOne','true')

        //dispatch(setClearObject(newRandomNumber))
      //  dispatch(RemoveOne(!removeOne))
    }





    const colorx = useSelector((state) => state.data.changecolor);

  return (
      <>
          <div>
          <div className="conteint p-4 d-flex justify-content-center align-items-center">

              <Turn options={options} className="magazine ">
                  <Page1/>
                  <Page2/>
                  <Page3/>
                  <Page4/>
                  <Page5/>
                  <Page6/>
                  <Page7/>
                  <Page8/>
                  <Page9/>
                  <Page10/>
                  <Page11/>
                  <Page12/>
                  <Page13/>
                  <Page14/>
                  <Page15/>
                  <Page16/>
                  <Page17/>


              </Turn>
          </div>

          <div className={`${styles.AnnotationTool} d-flex justify-content-around align-items-center mt-3 `}
               style={{
                   width: '100%',
                   height: '25px',
                   backgroundColor: 'rgba(7, 71, 115, 0.7)',
                   //marginTop: 'auto',
                   marginBottom: 'auto',
                   zIndex: '99888',
                   position: 'absolute',
                   direction: "ltr"
               }}>

              <OverlayTrigger overlay={lineTooltip}>
                  <button
                      className={`${styles.button1}`}
                      onClick={handeline}
                      style={{color: isAddLineClicked ? '#f9b331' : '#dbdbdb'}}
                  >
                      <FontAwesomeIcon className={`${styles.iconstyly} `} icon={faMinus}/>


                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={circleTooltip}>
                  <button

                      className={`${styles.button1} `}
                      onClick={handelcircle}
                      style={{color: isAddCircleClicked ? '#f9b331' : '#dbdbdb'}}
                  >

                      <FontAwesomeIcon icon={faCircle} className={`${styles.iconstyly} `}/>
                  </button>

              </OverlayTrigger>
              <OverlayTrigger overlay={rectangleTooltip}>
                  <button

                      className={`${styles.button1} `}
                      onClick={handelRec}
                      disabled={!cropImage}
                      style={{color: isAddRectangleClicked ? '#f9b331' : '#dbdbdb'}}
                  >
                      <FontAwesomeIcon className={`${styles.iconstyly}`} icon={faSquare}/>

                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={textTooltip}>
                  <button className={`${styles.button1} `} onClick={handetext}
                          style={{color: isAddTextClicked ? '#f9b331' : '#dbdbdb'}}>
                      <FontAwesomeIcon icon={faT} className={`${styles.iconstyly} `}
                                       style={{fontSize: '18px'}}/>


                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={drawTooltip}>
                  <button className={`${styles.button1} `} onClick={handedraw}
                          style={{color: isDrawClicked ? '#f9b331' : '#dbdbdb'}}>
                      <FontAwesomeIcon icon={faPen}
                                       className={`${styles.iconstyly} `}/>

                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={draw2Tooltip}>
                  <button className={`${styles.button1} `} onClick={handedraw2}
                          style={{color: isDraw2Clicked ? '#f9b331' : '#dbdbdb'}}>
                      <FontAwesomeIcon icon={faPaintBrush}
                                       className={`${styles.iconstyly} `}/>


                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={undoTooltip}>

                  <button className={`${styles.button1} `} onClick={handelundo}
                          style={{color: isundoClicked ? '#f9b331' : '#dbdbdb'}}>

                      <FontAwesomeIcon icon={faUndoAlt} className={`${styles.iconstyly}  `}/>
                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={RedoTooltip}>
                  <button className={`${styles.button1} `} onClick={handeRedo}
                          style={{color: isredoClicked ? '#f9b331' : '#dbdbdb'}}>
                      <FontAwesomeIcon icon={faRedoAlt} className={`${styles.iconstyly}  `}/>

                  </button>
              </OverlayTrigger>
              <OverlayTrigger overlay={removeObject}>

                  <button className={`${styles.button1} `} onClick={toggleRemoveOne}
                          style={{color: buttonColor}}>


                      <FontAwesomeIcon icon={faEraser} className={`${styles.iconstyly} `}/>
                  </button>



              </OverlayTrigger>
              <OverlayTrigger overlay={clearAll}>
                  {/* <button   className={`${styles.button1} `}   onClick={ClearAll} style={{ color: isclearClicked ? '#f9b331' : '#dbdbdb' }}  > */}
                  <button className={`${styles.button1} `} onClick={ClearAll} style={{color: '#dbdbdb'}}>
                      <FontAwesomeIcon icon={faTrash} className={`${styles.iconstyly} `}/>
                  </button>
              </OverlayTrigger>

              {/* Save button */}
              <OverlayTrigger overlay={Save}>
                  <button className={`${styles.button1} d-none`} onClick={() => {


                  }}>

                      <FontAwesomeIcon icon={faSave} className={`${styles.iconstyly} `}
                                       style={{color: '#dbdbdb'}}/>
                  </button>
              </OverlayTrigger>


              <label>
                  <OverlayTrigger placement="top" overlay={colorTooltip}>
                      <input
                          className='mt-1'
                          style={{width: '38px', height: '20px'}}
                          type="color"

                          //dispatch(ChageColor())
                          value={colorx}
                          onChange={(e) => {
                              dispatch(ChageColor(e.target.value))
                              setAddLineClicked(false);
                              setAddCircleClicked(false);
                              setAddRectangleClicked(false);
                              setAddTextClicked(false);
                              setDrawClicked(false);
                              setDraw2Clicked(false);
                              setundoClicked(false);
                              setredoClicked(false);
                              setclearClicked(false);
                              setremoveSelectedObjectClicked(true);
                          } }

                      />
                  </OverlayTrigger>
              </label>


          </div>
          {/*<OverlayTrigger overlay={<Tooltip id="tooltip-video"> Click to Open the Video</Tooltip>}>*/}


          {/*<button onClick={handelcircle}>add circle</button>*/}
          {/*<button onClick={handeline}>add Line</button>*/}
          {/*<button onClick={handetext}>add text</button>*/}
          {/*<button onClick={handelRec}>add Rec</button>*/}
          {/*<button onClick={handelundo}>add undo</button>*/}
          {/*<button onClick={handeRedo}>add Redo</button>*/}
          {/*<button onClick={handedraw}>add Draw</button>*/}
          {/*<button onClick={handedraw2}>add Draw2</button>*/}
          {/*<button onClick={ClearAll}>Clear All</button>*/}
          {/*/!*<button onClick={RemoveSelectedObject} style={buttonStyle}>*!/*/}
          {/*/!*    Remove Selected Object*!/*/}
          {/*/!*</button>;*!/*/}
          {/*<button*/}
          {/*    style={{ backgroundColor: buttonColor }}*/}
          {/*    onClick={toggleRemoveOne}>*/}

          {/*    Remove Selected Object*/}
          {/*</button>*/}

          </div>
      </>
  );
};

export default Flipbook;
