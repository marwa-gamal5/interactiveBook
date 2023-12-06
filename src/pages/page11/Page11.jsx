import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import image from '../../assets/Book/11.jpg';
import styles from './page11.module.css';

function Page11() {
  const { editor, onReady } = useFabricJSEditor();
  const lineTooltip  = <Tooltip id="tooltip-add-line">Line</Tooltip>;
  const circleTooltip = <Tooltip id="tooltip-add-circle">Circle</Tooltip>;
  const rectangleTooltip = <Tooltip id="tooltip-add-rectangle">Square</Tooltip>; 
  const textTooltip = <Tooltip id="tooltip-add-text">Add text</Tooltip>;
  const drawTooltip = <Tooltip id="tooltip-draw">Freehand</Tooltip>; 
  const draw2Tooltip = <Tooltip id="tooltip-draw2"   >Brush</Tooltip>; 
  const undoTooltip = <Tooltip id="tooltip-undo">Undo</Tooltip>;
  const RedoTooltip = <Tooltip id="tooltip-undo">Redo</Tooltip>; 
  const removeObject = <Tooltip id="tooltip-draw2">Remove Selected Object</Tooltip>; 
  const clearAll = <Tooltip id="tooltip-undo">clear All</Tooltip>;
  const Save = <Tooltip id="tooltip-undo">Save</Tooltip>; 


  const history = [];
  const [color, setColor] = useState("#35363a");
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
  

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
   
    }

  
  };



  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(1000);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  const [flag1, setflag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const Draw2 = () => {
    
    setFlag2(false);
 
  setflag1(!flag1);
    editor.canvas.isDrawingMode = !flag1;
    editor.canvas.freeDrawingBrush.width = 12;
   
    console.log("fllag1",flag1)
    console.log("fllag2",flag2)
    console.log("Draw2", editor.canvas.isDrawingMode );
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
    saveToLocalStorage();
  };
  const Draw = () => {
    setflag1(false);
    setFlag2(!flag2);
    editor.canvas.isDrawingMode = !flag2;
    editor.canvas.freeDrawingBrush.width = 2;
    console.log("fllag1",flag1)
    console.log("fllag2",flag2)
      console.log("Draw", editor.canvas.isDrawingMode );
      saveToLocalStorage();
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
  };

 
  const saveToLocalStorage = () => {
    const canvasData = JSON.stringify(editor.canvas.toObject());
    localStorage.setItem('fabricCanvas', canvasData);
  };

  const loadFromLocalStorage = () => {
    const savedCanvasData = localStorage.getItem('fabricCanvas');
    if (savedCanvasData) {
      editor.canvas.loadFromJSON(savedCanvasData, () => {
        editor.canvas.renderAll();
      });
    }
  };
  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

 
  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      
      history.push(editor.canvas._objects.pop());
     
    }
    editor.canvas.renderAll();
    saveToLocalStorage();
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
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
    saveToLocalStorage(); 
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
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
    saveToLocalStorage();
    setAddLineClicked(false);
    setAddCircleClicked(false);
    setAddRectangleClicked(false);
    setAddTextClicked(false);
    setDrawClicked(false);
    setDraw2Clicked(false);
    setundoClicked(false);
    setredoClicked(false);
    setclearClicked(true);
    setremoveSelectedObjectClicked(false);};

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
    saveToLocalStorage();
  
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
  const showme = () => {
    const canvasObjects = editor.canvas.getObjects();
    
    // Log individual objects on the canvas
    // canvasObjects.forEach((obj, index) => {
    //   console.log(`Object ${index + 1}:`, JSON.stringify(obj));
    // });
  
    // Log the entire canvas data
     console.log("Canvas data:", JSON.stringify(editor.canvas.toObject()));
  };


  

  const onAddCircle = () => {
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
    const circleObject = editor.addCircle();
    saveToLocalStorage();
    // console.log(JSON.stringify(circleObject));
  
    // If you want to log the entire canvas data after adding the circle
    // console.log("canvas data=",JSON.stringify(editor.canvas.toObject()));
  };
  const onAddLine = () => {
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
    editor.addLine();
    saveToLocalStorage();
  };
  const onAddRectangle = () => {
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
    editor.addRectangle();
    saveToLocalStorage();
  };
  const addText = () => {
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
    editor.addText("inset text");
    
  };



  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    // Load canvas data from local storage on component mount
    loadFromLocalStorage();
  }, [editor]);
  return (
    <>
    <div >
      <div className="d-flex flex-row h-100 w-100 p-0 justify-content-start" style={{ backgroundColor: '#A6A6A6B2' }}>
        <div style={{ width: '100%' }}>
          
        {/* marginTop:'775px' */}
          <div className={`${styles.AnnotationTool} d-flex justify-content-around align-items-center `} style={{ width: '100%', height: '25px', backgroundColor: 'rgba(7, 71, 115, 0.7)' ,marginTop:'775px', zIndex: '99888' , position: 'absolute' ,direction: "ltr" }}>

<OverlayTrigger overlay={lineTooltip }>
<button
className={`${styles.button1}`}
onClick={onAddLine}
style={{ color: isAddLineClicked ? '#f9b331' : '#dbdbdb' }}
>
<i className={`${styles.iconstyly} fa-solid fa-minus`} />
</button>
</OverlayTrigger>
<OverlayTrigger overlay={circleTooltip}>
<button
 
  className={`${styles.button1} `}
  onClick={onAddCircle}
  style={{ color: isAddCircleClicked ? '#f9b331' : '#dbdbdb' }}
>
  <i className={`${styles.iconstyly} fa-regular fa-circle`} />
</button>

</OverlayTrigger>
<OverlayTrigger overlay={rectangleTooltip}>
<button

  className={`${styles.button1} `}
  onClick={onAddRectangle}
  disabled={!cropImage}
  style={{ color: isAddRectangleClicked ? '#f9b331' : '#dbdbdb' }}
>
  <i className={`${styles.iconstyly} fa-regular fa-square`} />
</button>
</OverlayTrigger>
<OverlayTrigger overlay={textTooltip}>
<button className={`${styles.button1} `}   onClick={addText}  style={{ color: isAddTextClicked ? '#f9b331' : '#dbdbdb' }}  >

<i className={`${styles.iconstyly} bi bi-fonts`} style={{fontSize: '30px' }}></i>

</button>
</OverlayTrigger>
<OverlayTrigger overlay={drawTooltip}>
<button    className={`${styles.button1} `} onClick={Draw} style={{ color: isDrawClicked ? '#f9b331' : '#dbdbdb' }}>
<i style={{ color: flag2 ? '#f9b331' : '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-pen`}></i>
</button>
</OverlayTrigger>
<OverlayTrigger overlay={draw2Tooltip}>
<button    className={`${styles.button1} `}   onClick={Draw2} style={{ color: isDraw2Clicked ? '#f9b331' : '#dbdbdb' }} ><i style={{ color: flag1 ? '#f9b331' : '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-paintbrush `}></i></button>
</OverlayTrigger>
<OverlayTrigger overlay={undoTooltip }>

<button   className={`${styles.button1} `}   onClick={undo} style={{ color: isundoClicked ? '#f9b331' : '#dbdbdb' }}  ><i  className={`${styles.iconstyly} fa-solid fa-rotate-left `}></i></button>
</OverlayTrigger>
<OverlayTrigger overlay={RedoTooltip }>
<button   className={`${styles.button1} `}   onClick={redo}  style={{ color: isredoClicked ? '#f9b331' : '#dbdbdb' }} ><i  className={`${styles.iconstyly} fa-solid fa-rotate-right `}></i></button>
</OverlayTrigger>
<OverlayTrigger overlay={removeObject }>

<button    className={`${styles.button1} `}   onClick={removeSelectedObject} style={{ color: isremoveSelectedObjectClicked ? '#f9b331' : '#dbdbdb' }}  ><i  className={`${styles.iconstyly} fa-solid fa-eraser `}></i></button>
</OverlayTrigger>
<OverlayTrigger overlay={clearAll }>
<button   className={`${styles.button1} `}   onClick={clear} style={{ color: isclearClicked ? '#f9b331' : '#dbdbdb' }}  ><i  className={`${styles.iconstyly} fa-solid fa-trash `}></i></button>
</OverlayTrigger>

{/* Save button */}
<OverlayTrigger overlay={Save }>
<button   className={`${styles.button1} `}  onClick={saveToLocalStorage} >
<i className={`${styles.iconstyly}  fa-regular fa-floppy-disk ` } style={{ color: '#dbdbdb' }} ></i>
</button>
</OverlayTrigger>
<label disabled={!cropImage}>
<input
className=''
disabled={!cropImage}
type="color"
value={color}
onChange={(e) => setColor(e.target.value)}
/>
</label>



</div>
         



           {/* Container for icon and image */}
          
              
              <img src={image} alt="page11" style={{ position: 'absolute' }} className={`p-0 m-0 w-100`} />
            
          <FabricJSCanvas className="sample-canvas p-0 m-0 " style={{ position: 'relative', top: '0', left: '0', zIndex: '7777'}}
            onReady={onReady} />
        </div>
      </div>
    </div>
  </>
  )
}

export default Page11;