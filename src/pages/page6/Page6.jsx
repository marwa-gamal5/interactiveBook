
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect, useState } from "react";
import styles from './page6.module.css';

function Page6() {
    
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

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
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  
  
  const [flag1, setflag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  // var flag1=false;
  // var flag2=false;

  const Draw2 = () => {
    setFlag2(false);
  //  flag1=!flag1;
  setflag1(!flag1);
    editor.canvas.isDrawingMode = !flag1;
    editor.canvas.freeDrawingBrush.width = 12;
   
    console.log("fllag1",flag1)
    console.log("fllag2",flag2)
    console.log("Draw2", editor.canvas.isDrawingMode );
  };
   const Draw = () => {
    setflag1(false);
    setFlag2(!flag2);
    editor.canvas.isDrawingMode = !flag2;
    editor.canvas.freeDrawingBrush.width = 2;
    console.log("fllag1",flag1)
    console.log("fllag2",flag2)
      console.log("Draw", editor.canvas.isDrawingMode );
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
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
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
    const circleObject = editor.addCircle();
    // console.log(JSON.stringify(circleObject));
  
    // If you want to log the entire canvas data after adding the circle
    // console.log("canvas data=",JSON.stringify(editor.canvas.toObject()));
  };
  const onAddLine = () => {
    editor.addLine();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };
  const addText = () => {
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
    <div style={{ backgroundColor: 'dodgerblue' }}>
    <div className={`${styles.content} `} >
    <button onClick={showme} className='mb-3'>JSON </button>
      <div className={`${styles.AnnotationTool}    d-flex justify-content-around align-items-center  `}>
  
 
      {/* <button onClick={loadFromLocalStorage} disabled={!cropImage}>
        Load
      </button> */}
  
  <button  className={`${styles.button1} `}   onClick={onAddLine}><i className={`${styles.iconstyly} fa-solid fa-minus  `} style={{ color: '#dbdbdb' }}></i></button>
    <button  className={`${styles.button1} `}   onClick={onAddCircle}><i className={`${styles.iconstyly} fa-regular fa-circle `} style={{ color: '#dbdbdb' }}></i></button>
   

  
    <button  className={`${styles.button1} `}   onClick={onAddRectangle} disabled={!cropImage} ><i className={`${styles.iconstyly} fa-regular fa-square `} style={{ color: '#dbdbdb' }}></i></button>
  
    <button className={`${styles.button1} `}   onClick={addText} disabled={!cropImage}>
    
    <i className={`${styles.iconstyly} bi bi-fonts`} style={{ color: '#dbdbdb', fontSize: '44px' }}></i>

    
    </button>
    <button className={`${styles.button1} `} onClick={Draw} disabled={!cropImage}>
  <i style={{ color: flag2 ? 'blue' : '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-pen`}></i>
</button>
    <button  className={`${styles.button1} `}   onClick={Draw2} disabled={!cropImage} ><i style={{ color: flag1 ? 'blue' : '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-paintbrush `}></i></button>
    
 
    
    <button  className={`${styles.button1} `}   onClick={undo} disabled={!cropImage} ><i style={{ color: '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-rotate-left `}></i></button>
    <button  className={`${styles.button1} `}   onClick={redo} disabled={!cropImage} ><i style={{ color: '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-rotate-right `}></i></button>
 
   
    <button  className={`${styles.button1} `}   onClick={clear} disabled={!cropImage} ><i style={{ color: '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-trash `}></i></button>
    <button  className={`${styles.button1} `}   onClick={removeSelectedObject} disabled={!cropImage} ><i style={{ color: '#dbdbdb' }} className={`${styles.iconstyly} fa-solid fa-eraser `}></i></button>
  
       {/* Save button */}
     <button className={`${styles.button1} `}  onClick={saveToLocalStorage} disabled={!cropImage}>
    <i className={`${styles.iconstyly}  fa-regular fa-floppy-disk ` } style={{ color: '#dbdbdb' }} ></i>
      </button>
    
    <label disabled={!cropImage}>
      <input
        disabled={!cropImage}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </label>
 
 
   
    </div>

    <div
      style={{
        border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
        width: "500px",
        height: "500px"
      }}
    >
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  </div>
  </div>
);
}

export default Page6;
