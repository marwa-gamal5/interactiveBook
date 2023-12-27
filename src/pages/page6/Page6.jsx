import {FabricJSCanvas, useFabricJSEditor} from 'fabricjs-react';
import React, {useEffect, useRef, useState} from "react";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import image from '../../assets/Book/11.jpg';
import image2 from '../../assets/Book/12.jpg';
import styles from '../page11/page11.module.css';
import {axiosInstance} from '../../network/axiosinstance';
import {useSelector, useDispatch} from "react-redux";
import {getData} from "../../store/actions/dataAction.jsx";
import axios from "axios";
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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactTouchEvents from "react-touch-events";

const MySwal = withReactContent(Swal);

function Page6() {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data.data);
  


    const {editor, onReady} = useFabricJSEditor();
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

    // useEffect(() => {
    //     console.log('data From pages : ' , data)
    // }, [])
    //
    useEffect(() => {
        if (!editor || !fabric) {
            return;
        }

        const resizeCanvas = () => {
            const canvasContainer = document.getElementById('canvas-container');
            if (canvasContainer) {
                const containerWidth = canvasContainer.offsetWidth;
                const containerHeight = canvasContainer.offsetHeight;

                editor.canvas.setHeight(100);
                editor.canvas.setWidth(containerWidth);

                editor.canvas.renderAll(); // Force render after changing dimensions

                // Additional adjustments or logic can be added as needed
            }
        };

        resizeCanvas(); // Call the resizeCanvas function initially

        window.addEventListener('resize', resizeCanvas);

        return () => {
            // Cleanup event listener on component unmount
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [editor])


    const handlesave = () => {
        saveToBackend(); // Call saveToBackend function
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    };

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
                editor.canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
        }

        if (!editor.canvas.__eventListeners["mouse:down"]) {
            editor.canvas.on("mouse:down", function (opt) {
                console.log("Mouse down event triggered");
                var evt = opt.e;
                if (evt.ctrlKey === true) {
                    this.isDragging = true;
                    this.selection = true;
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
                console.log("Mouse up event triggered");
                // saveToBackend();

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


    // useEffect(() => {
    //     if (!editor || !fabric) {
    //         return;
    //     }
    //     editor.canvas.setHeight(1000);
    //     editor.canvas.setWidth(1125);
    //     addBackground();
    //     editor.canvas.renderAll();
    // }, [editor?.canvas.backgroundImage]);

    const [flag1, setflag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const Draw2 = () => {

        setFlag2(false);

        setflag1(!flag1);
        editor.canvas.isDrawingMode = !flag1;
        editor.canvas.freeDrawingBrush.width = 12;

        console.log("fllag1", flag1)
        console.log("fllag2", flag2)
        console.log("Draw2", editor.canvas.isDrawingMode);
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
        // saveToBackend();
        // saveToLocalStorage();
    };
    const Draw = () => {
        setflag1(false);
        setFlag2(!flag2);
        editor.canvas.isDrawingMode = !flag2;
        editor.canvas.freeDrawingBrush.width = 2;
        console.log("fllag1", flag1)
        console.log("fllag2", flag2)
        console.log("Draw", editor.canvas.isDrawingMode);
        // saveToLocalStorage();
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
        // saveToBackend();
    };


    // const saveToLocalStorage = () => {
    //   const canvasData = JSON.stringify(editor.canvas.toObject());
    //   localStorage.setItem('fabricCanvas', canvasData);
    // };
// data = [{page_id: 11, json_data: '{"version":"5.3.0","objects":[{"type":"path","vers…5625,574,635.5625,573],["L",637.5745,571.988]]}]}'},
//   {page_id: 12, json_data: '{"version":"5.3.0","objects":[{"type":"path","vers…5625,574,635.5625,573],["L",637.5745,571.988]]}]}'},
//   {page_id: 13, json_data: '{"version":"5.3.0","objects":[{"type":"path","vers…5625,574,635.5625,573],["L",637.5745,571.988]]}]}'}]
    let savedCanvasData = {}

    const getEdits = () => {
        if (!editor || !fabric) {
            console.log('NO CANVAS')
            return;
        }

        const pageIndex = data.findIndex(item => item.page_id === 6);
        if (pageIndex != -1) {
            savedCanvasData = data[pageIndex].json_data;
        }
        console.log('pageIndex : ', pageIndex)

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
        // saveToLocalStorage();
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
        // saveToBackend();
    };
    const redo = () => {
        if (history.length > 0) {
            editor.canvas.add(history.pop());
        }
        // saveToLocalStorage();
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
        saveToBackend();
    };

    const clear = () => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length);
        history.splice(0, history.length);
        editor.canvas.renderAll();
        // saveToLocalStorage();
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
        saveToBackend();
    };

    const removeSelectedObject = () => {
        editor.canvas.remove(editor.canvas.getActiveObject());
        // saveToLocalStorage();

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
        saveToBackend();
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
        saveToBackend();
        // saveToLocalStorage();
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
        // saveToLocalStorage();
        saveToBackend();
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
        // saveToLocalStorage();
        saveToBackend();
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
        editor.addText("insert text");

    };

// const dispatch = useDispatch()

    // useEffect(() => {
    //   if (!editor || !fabric) {
    //     return;
    //   }
    //
    //   // Load canvas data from local storage on component mount
    //   // saveToBackend()
    // }, [editor]);


    useEffect(() => {
        getEdits();
    }, [savedCanvasData])

    const [jsonData, setJsonData] = useState("");
    const [pageId, setPageId] = useState(6); // Use state for page_id
    // const [jsonData, setJsonData] = useState("");
    const saveToBackend = async () => {
        try {
            // const page_id = 15;  // Replace with your actual page ID
            // const json_data = JSON.stringify(editor.canvas.toObject());


            const canvasData = JSON.stringify(editor.canvas.toObject());
            setJsonData(canvasData); // Update jsonData state

            // setTimeout(() => {
            //     console.log('after time: ', canvasData);
            //     axiosInstance.post('/interactivebook/insert_jsondata/', {
            //         "page_id": pageId,
            //         "jsondata": canvasData,
            //     });
            //     // dispatch(getData())
            // }, 10000);

            await axiosInstance.post('/interactivebook/insert_jsondata/', {
                "page_id": pageId,
                "jsondata": JSON.stringify(editor.canvas.toObject()),
            });

            dispatch(getData())

            console.log('Data sent to the backend successfully!');
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }

    };
    const colorTooltip = <Tooltip id="tooltip-color">Select Color</Tooltip>;
    const [moved , setMoved] = useState(false)
    const touchStartX = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const handleTouchEnd = async (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        // Calculate the distance moved
        const distance = touchEndX - touchStartX.current;

        if (distance !== 0) {
            // Use async/await to wait for the delay
            await delay(0);

            // Now you can safely call saveToBackend after the delay
            saveToBackend();
        }
    };

    // const handleTouchEnd = async (e) => {
    //     const touchEndX = e.changedTouches[0].clientX;
    //     // Calculate the distance moved
    //     const distance = touchEndX - touchStartX.current;
    //     if (distance !== 0) {
    //     // setTimeout(() => {
    //     //     saveToBackend()
    //     // }, 500);
    //
    //         await saveToBackend()
    //     }
    // };


    return (
        <>
            {/*<ReactTouchEvents*/}
            {/*    // onTap={ this.handleTap.bind(this) }*/}
            {/*    onSwipe={saveToBackend}*/}
            {/*>*/}
            <div
                onMouseLeave={saveToBackend}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}

                // onTouchMove={() => setMoved(true)}
                // onTouchEnd={() => { if(!isDrawClicked)
                // {
                //     saveToBackend()
                // }}}
            >
                <div className="d-flex flex-row h-100 w-100 p-0 justify-content-start"
                     style={{backgroundColor: '#A6A6A6B2'}}>
                    <div style={{width: '100%'}}>

                        <FontAwesomeIcon icon="fa-solid fa-minus"/>
                        {/* marginTop:'775px' */}
                        <div className={`${styles.AnnotationTool} d-flex justify-content-around align-items-center ` }
                             style={{
                                 width: '100%',
                                 height: '25px',
                                 backgroundColor: 'rgba(7, 71, 115, 0.7)',
                                 marginTop: '775px',
                                 zIndex:'99999999',
                                 position: 'absolute',
                                 direction: "ltr"
                             }}>

                            <OverlayTrigger overlay={lineTooltip}>
                                <button
                                    className={`${styles.button1}`}
                                    onClick={onAddLine}
                                    style={{color: isAddLineClicked ? '#f9b331' : '#dbdbdb'}}
                                >
                                    <FontAwesomeIcon className={`${styles.iconstyly} `} icon={faMinus}/>


                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={circleTooltip}>
                                <button

                                    className={`${styles.button1} `}
                                    onClick={onAddCircle}
                                    style={{color: isAddCircleClicked ? '#f9b331' : '#dbdbdb'}}
                                >

                                    <FontAwesomeIcon icon={faCircle} className={`${styles.iconstyly} `}/>
                                </button>

                            </OverlayTrigger>
                            <OverlayTrigger overlay={rectangleTooltip}>
                                <button

                                    className={`${styles.button1} `}
                                    onClick={onAddRectangle}
                                    disabled={!cropImage}
                                    style={{color: isAddRectangleClicked ? '#f9b331' : '#dbdbdb'}}
                                >
                                    <FontAwesomeIcon className={`${styles.iconstyly}`} icon={faSquare}/>

                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={textTooltip}>
                                <button className={`${styles.button1} `} onClick={addText}
                                        style={{color: isAddTextClicked ? '#f9b331' : '#dbdbdb'}}>
                                    <FontAwesomeIcon icon={faT} className={`${styles.iconstyly} `}
                                                     style={{fontSize: '18px'}}/>


                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={drawTooltip}>
                                <button className={`${styles.button1} `} onClick={Draw}
                                        style={{color: isDrawClicked ? '#f9b331' : '#dbdbdb'}}>
                                    <FontAwesomeIcon icon={faPen} style={{color: flag2 ? '#f9b331' : '#dbdbdb'}}
                                                     className={`${styles.iconstyly} `}/>

                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={draw2Tooltip}>
                                <button className={`${styles.button1} `} onClick={Draw2}
                                        style={{color: isDraw2Clicked ? '#f9b331' : '#dbdbdb'}}>
                                    <FontAwesomeIcon icon={faPaintBrush} style={{color: flag1 ? '#f9b331' : '#dbdbdb'}}
                                                     className={`${styles.iconstyly} `}/>


                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={undoTooltip}>

                                <button className={`${styles.button1} `} onClick={undo}
                                        style={{color: isundoClicked ? '#f9b331' : '#dbdbdb'}}>

                                    <FontAwesomeIcon icon={faUndoAlt} className={`${styles.iconstyly}  `}/>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={RedoTooltip}>
                                <button className={`${styles.button1} `} onClick={redo}
                                        style={{color: isredoClicked ? '#f9b331' : '#dbdbdb'}}>
                                    <FontAwesomeIcon icon={faRedoAlt} className={`${styles.iconstyly}  `}/>

                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={removeObject}>

                                <button className={`${styles.button1} `} onClick={removeSelectedObject}
                                        style={{color: isremoveSelectedObjectClicked ? '#f9b331' : '#dbdbdb'}}>

                                    <FontAwesomeIcon icon={faEraser} className={`${styles.iconstyly} `}/>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={clearAll}>
                                {/* <button   className={`${styles.button1} `}   onClick={clear} style={{ color: isclearClicked ? '#f9b331' : '#dbdbdb' }}  > */}
                                <button className={`${styles.button1} `} onClick={clear} style={{color: '#dbdbdb'}}>
                                    <FontAwesomeIcon icon={faTrash} className={`${styles.iconstyly} `}/>
                                </button>
                            </OverlayTrigger>

                            {/* Save button */}
                            <OverlayTrigger overlay={Save} >
                                <button className={`${styles.button1} d-none`} onClick={() => {
                                    handlesave();

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
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}

                                    />
                                </OverlayTrigger>
                            </label>


                        </div>

                        {/* Container for icon and image */}

                        {/* <div className={`d-flex w-100 flex-row p-0 h-100`} style={{position: 'absolute'}}> */}
                        <div  id="canvas-container"  className={`d-flex w-100 flex-row p-0 h-100`} style={{ position: 'absolute' }}>
                            <img src={image2} alt="page3" className={`w-50 h-100`}/>
                            <img src={image} alt="page3" className={`w-50 h-100`}/>
                          
                        
                            
                        </div>
                        {/*<img src={image} alt="page11" style={{ position: 'absolute' }} className={`p-0 m-0 w-100`} />*/}
                        <div className='w-auto'>
                        <FabricJSCanvas className="sample-canvas p-0 m-0 " 
                        
                        style={{position: 'relative', top: '0', left: '0', zIndex: '7777'}}
                        onReady={onReady}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*</ReactTouchEvents>*/}

        </>
    )
}

export default Page6;