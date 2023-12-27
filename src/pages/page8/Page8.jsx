import {FabricJSCanvas, useFabricJSEditor} from 'fabricjs-react';
import  {useEffect, useState} from "react";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import {axiosInstance} from '../../network/axiosinstance';
// {*****************image import*******************}
import image from '../../assets/Book/15.jpg';
import image2 from '../../assets/Book/16.jpg';
// {***************** import from redux *******************}
import {getData} from "../../store/actions/dataAction.jsx";
import {useSelector, useDispatch} from "react-redux";
// {*****************icons import*******************}
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
// {*****************video import*******************}
import videoSrc from '../../assets/video.mp4'; // Import your video file


import {SetStopDraw,ChageColor} from '../../store/actions/dataAction1.jsx'

import styles from  './page8.module.css'





function Page8() {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.data.data);
    //to use FabricJ with canvas
    const {editor, onReady} = useFabricJSEditor();

//to use Audio
    const [isAudioPlaying, setAudioPlaying] = useState(false);
    const handleAudioClick = () => {
        // Toggle the state to start/stop playing the audio
        setAudioPlaying(!isAudioPlaying);
    };
    //to use Video
    const [showVideoModal, setShowVideoModal] = useState(false);
    // Function to toggle the video modal
    const toggleVideoModal = () => {
        setShowVideoModal(!showVideoModal);
    };



    const history = [];

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






    //control Mouse event

    useEffect(() => {

        if (!editor || !fabric) {
            return;
        }


        if (cropImage) {
            editor.canvas.__eventListeners = {};
            return;
        }

        // if (!editor.canvas.__eventListeners["mouse:wheel"]) {
        //     editor.canvas.on("mouse:wheel", function (opt) {
        //         var delta = opt.e.deltaY;
        //         var zoom = editor.canvas.getZoom();
        //         zoom *= 0.999 ** delta;
        //         if (zoom > 20) zoom = 20;
        //         if (zoom < 0.01) zoom = 0.01;
        //         editor.canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
        //         opt.e.preventDefault();
        //         opt.e.stopPropagation();
        //     });
        // }
        //
        // if (!editor.canvas.__eventListeners["mouse:down"]) {
        //     editor.canvas.on("mouse:down", function (opt) {
        //
        //         var evt = opt.e;
        //         if (evt.ctrlKey === true) {
        //             this.isDragging = true;
        //             this.selection = true;
        //             this.lastPosX = evt.clientX;
        //             this.lastPosY = evt.clientY;
        //         }
        //     });
        // }
        //
        // if (!editor.canvas.__eventListeners["mouse:move"]) {
        //     editor.canvas.on("mouse:move", function (opt) {
        //         if (this.isDragging) {
        //             var e = opt.e;
        //             var vpt = this.viewportTransform;
        //             vpt[4] += e.clientX - this.lastPosX;
        //             vpt[5] += e.clientY - this.lastPosY;
        //             this.requestRenderAll();
        //             this.lastPosX = e.clientX;
        //             this.lastPosY = e.clientY;
        //         }
        //     });
        // }
        //
        // if (!editor.canvas.__eventListeners["mouse:up"]) {
        //     editor.canvas.on("mouse:up", function (opt) {
        //         // on mouse up we want to recalculate new interaction
        //         // for all objects, so we call setViewportTransform
        //
        //         saveToBackend();
        //
        //         this.setViewportTransform(this.viewportTransform);
        //         this.isDragging = false;
        //         this.selection = true;
        //     });
        // }

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
        editor.canvas.setHeight(775);
        editor.canvas.setWidth(1120);
        addBackground();
        editor.canvas.renderAll();
    }, [editor?.canvas.backgroundImage]);

    const [stopBruch, setstopBruch] = useState(false);
    const [stopFreehand, setstopFreehand] = useState(false);
    const Draw2 = () => {

        setstopFreehand(false);

        setstopBruch(!stopBruch);

        editor.canvas.isDrawingMode = !stopBruch;
        editor.canvas.freeDrawingBrush.width = 12;

        console.log("stopBruch=", stopBruch ,"stopFreehand=",stopFreehand,"Draw2=", editor.canvas.isDrawingMode)

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
        //  saveToBackend();

    };
    const Draw = () => {
        setstopBruch(false);
        setstopFreehand(!stopFreehand);

        editor.canvas.isDrawingMode = !stopFreehand;
        editor.canvas.freeDrawingBrush.width = 2;
        console.log("stopBruch=", stopBruch ,"stopFreehand=",stopFreehand,"Draw=", editor.canvas.isDrawingMode)
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
        //  saveToBackend();
    };
    let savedCanvasData = {}
    const getEdits = () => {
        if (!editor || !fabric) {
            console.log('NO CANVAS')
            return;
        }

        const pageIndex = data.findIndex(item => item.page_id === 8);
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
    const colorx = useSelector((state) => state.data.changecolor);
    useEffect(() => {
        if (!editor || !fabric) {
            return;
        }
        editor.canvas.freeDrawingBrush.color = colorx;
        editor.setStrokeColor(colorx);
    }, [colorx]);


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
        editor.canvas.isDrawingMode =false ;
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);
        // saveToBackend();

    };
    const redo = () => {
        if (history.length > 0) {
            editor.canvas.add(history.pop());
        }

        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(true);
        editor.canvas.isDrawingMode =false ;
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);
        // saveToBackend();
    };
    const clear = () => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length);
        history.splice(0, history.length);
        editor.canvas.renderAll();
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
        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        editor.canvas.isDrawingMode =false ;
        setremoveSelectedObjectClicked(true);
        // saveToBackend();
    };
    const onAddCircle = () => {
        setAddLineClicked(false);
        editor.canvas.isDrawingMode =false ;
        setAddCircleClicked(true);
        setAddRectangleClicked(false);
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);
        editor.addCircle();
        //saveToBackend();

    };
    const onAddLine = () => {


        setAddLineClicked(true);
        editor.canvas.isDrawingMode =false ;
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
        // saveToBackend();
    };
    const onAddRectangle = () => {
        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(true);
        editor.canvas.isDrawingMode =false ;
        setAddTextClicked(false);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);
        editor.addRectangle();
        // saveToLocalStorage();
        // saveToBackend();
    };
    const addText = () => {
        setAddLineClicked(false);
        setAddCircleClicked(false);
        setAddRectangleClicked(false);
        editor.canvas.isDrawingMode =false ;
        setAddTextClicked(true);
        setDrawClicked(false);
        setDraw2Clicked(false);
        setundoClicked(false);
        setredoClicked(false);
        setclearClicked(false);
        setremoveSelectedObjectClicked(false);
        editor.addText("insert text");

    };




    useEffect(() => {
        getEdits();
    }, [data])

    const [jsonData, setJsonData] = useState("");
    const [pageId, setPageId] = useState(8); // Use state for page_id

    const saveToBackend = async () => {


        const canvasData = JSON.stringify(editor.canvas.toObject());
        //setJsonData(canvasData); // Update jsonData state

        axiosInstance.post('/interactivebook/insert_jsondata/', {
            "page_id": pageId,
            "jsondata": canvasData,
        });

        console.log('Data sent to the backend successfully!');



        // dispatch(getData())

    };


    const colorTooltip = <Tooltip id="tooltip-color">Select Color</Tooltip>;

    const [flag,setflag]=useState(true)
    const circlee= useSelector((state) => state.data.circle);
    const pageNum=useSelector((state) => state.data.PageNum)
    useEffect(()=>{

        if(flag===false){

            if(pageNum===8){
                onAddCircle();

            }


        }
        setflag(false);

    }, [circlee]);
    const line= useSelector((state) => state.data.Line);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){
                onAddLine();

            }


        }
        setflag(false);

    }, [line])
    const text= useSelector((state) => state.data.addText);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){
                addText();

            }


        }
        setflag(false);

    }, [text])
    const Rec= useSelector((state) => state.data.rec);
    useEffect(()=>{

        if(flag===false){
            // if(PageNamper=)

            if(pageNum===8){
                onAddRectangle();

            }


        }
        setflag(false);

    }, [Rec])
    const undoo= useSelector((state) => state.data.undo);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){

                undo();

            }


        }
        setflag(false);

    }, [undoo])
    const redoo= useSelector((state) => state.data.redo);
    useEffect(()=>{

        if(flag===false){

            if(pageNum===8){
                redo();

            }


        }
        setflag(false);

    }, [redoo])
    const draww= useSelector((state) => state.data.draw);
    useEffect(()=>{

        if(flag===false){

            if(pageNum===8){
                Draw();

            }


        }
        setflag(false);

    }, [draww])
    const draww2= useSelector((state) => state.data.draw2);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){
                Draw2();

            }


        }
        setflag(false);

    }, [draww2])
    const clearAlll= useSelector((state) => state.data.ClearAll);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){
                clear();

            }


        }
        setflag(false);

    }, [clearAlll])
    const clearAllObject= useSelector((state) => state.data.ClearObject);
    useEffect(()=>{

        if(flag===false){


            if(pageNum===8){
                removeSelectedObject();

            }


        }
        setflag(false);

    }, [clearAllObject])


    useEffect(() => {

        if (!editor || !fabric) {
            return;
        }

        if (!editor.canvas.__eventListeners["selection:created"]) {
            editor.canvas.on("selection:created", function (opt) {
                console.log("editor.canvas.isDrawingMode",editor.canvas.isDrawingMode)
                let getlocal=localStorage.getItem('removeOne')
                console.log("getlocal",getlocal)
                if(getlocal==="true"){
                    editor.canvas.isDrawingMode =false ;

                    editor.canvas.remove(editor.canvas.getActiveObject(editor.canvas.item(0)))

                }

                // saveToBackend();
                //  setTimeout(()=>{
                //      saveToBackend();
                //  },3000)

            });
        }

        if (!editor.canvas.__eventListeners["object:added"]) {
            editor.canvas.on("object:added", function (opt) {


                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
                saveToBackend();

                //  setTimeout(()=>{
                //      saveToBackend();
                //  },0)


            });
        }
        if (!editor.canvas.__eventListeners["object:modified"]) {
            editor.canvas.on("object:modified", function (opt) {


                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
                saveToBackend();

                //  setTimeout(()=>{
                //      saveToBackend();
                //  },0)


            });
        }

        if (!editor.canvas.__eventListeners["object:removed"]) {
            editor.canvas.on("object:removed", function (opt) {


                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
                saveToBackend();

                //  setTimeout(()=>{
                //      saveToBackend();
                //  },0)


            });
        }


        editor.canvas.renderAll();

    }, [editor]);
    const stopdraw = useSelector((state) => state.data.stopdraw);
    useEffect(() => {
        console.log("stoooooooooooooo")
        if(editor)
        {
            console.log("stoooooooooooooop", editor.canvas.isDrawingMode)
            editor.canvas.isDrawingMode =false ;
        }

        console.log("editor.canvas.on",onReady)

    }, [stopdraw]);


    return (
        <>

            <div
                //onMouseLeave={saveToBackend}
                // onTouchStart={saveToBackend}
                // onTouchEnd={saveToBackend}
            >


                <div className="d-flex flex-row h-100 w-100 p-0 justify-content-start"
                     style={{backgroundColor: '#A6A6A6B2'}}>
                    <div style={{width: '100%'}}>


                        {/*<FontAwesomeIcon icon="fa-solid fa-minus"/>*/}
                        {/* marginTop:'775px' */}
                        {/*<div className={`${styles.AnnotationTool} d-flex justify-content-around align-items-center `}*/}
                        {/*     style={{*/}
                        {/*         width: '100%',*/}
                        {/*         height: '25px',*/}
                        {/*         backgroundColor: 'rgba(7, 71, 115, 0.7)',*/}
                        {/*         marginTop: '775px',*/}
                        {/*         zIndex: '99888',*/}
                        {/*         position: 'absolute',*/}
                        {/*         direction: "ltr"*/}
                        {/*     }}>*/}

                        {/*    <OverlayTrigger overlay={lineTooltip}>*/}
                        {/*        <button*/}
                        {/*            className={`${styles.button1}`}*/}
                        {/*            onClick={onAddLine}*/}
                        {/*            style={{color: isAddLineClicked ? '#f9b331' : '#dbdbdb'}}*/}
                        {/*        >*/}
                        {/*            <FontAwesomeIcon className={`${styles.iconstyly} `} icon={faMinus}/>*/}


                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={circleTooltip}>*/}
                        {/*        <button*/}

                        {/*            className={`${styles.button1} `}*/}
                        {/*            onClick={onAddCircle}*/}
                        {/*            style={{color: isAddCircleClicked ? '#f9b331' : '#dbdbdb'}}*/}
                        {/*        >*/}

                        {/*            <FontAwesomeIcon icon={faCircle} className={`${styles.iconstyly} `}/>*/}
                        {/*        </button>*/}

                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={rectangleTooltip}>*/}
                        {/*        <button*/}

                        {/*            className={`${styles.button1} `}*/}
                        {/*            onClick={onAddRectangle}*/}
                        {/*            disabled={!cropImage}*/}
                        {/*            style={{color: isAddRectangleClicked ? '#f9b331' : '#dbdbdb'}}*/}
                        {/*        >*/}
                        {/*            <FontAwesomeIcon className={`${styles.iconstyly}`} icon={faSquare}/>*/}

                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={textTooltip}>*/}
                        {/*        <button className={`${styles.button1} `} onClick={addText}*/}
                        {/*                style={{color: isAddTextClicked ? '#f9b331' : '#dbdbdb'}}>*/}
                        {/*            <FontAwesomeIcon icon={faT} className={`${styles.iconstyly} `}*/}
                        {/*                             style={{fontSize: '18px'}}/>*/}


                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={drawTooltip}>*/}
                        {/*        <button className={`${styles.button1} `} onClick={Draw}*/}
                        {/*                style={{color: isDrawClicked ? '#f9b331' : '#dbdbdb'}}>*/}
                        {/*            <FontAwesomeIcon icon={faPen} style={{color: stopFreehand ? '#f9b331' : '#dbdbdb'}}*/}
                        {/*                             className={`${styles.iconstyly} `}/>*/}

                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={draw2Tooltip}>*/}
                        {/*        <button className={`${styles.button1} `} onClick={Draw2}*/}
                        {/*                style={{color: isDraw2Clicked ? '#f9b331' : '#dbdbdb'}}>*/}
                        {/*            <FontAwesomeIcon icon={faPaintBrush} style={{color: stopBruch ? '#f9b331' : '#dbdbdb'}}*/}
                        {/*                             className={`${styles.iconstyly} `}/>*/}


                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={undoTooltip}>*/}

                        {/*        <button className={`${styles.button1} `} onClick={undo}*/}
                        {/*                style={{color: isundoClicked ? '#f9b331' : '#dbdbdb'}}>*/}

                        {/*            <FontAwesomeIcon icon={faUndoAlt} className={`${styles.iconstyly}  `}/>*/}
                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={RedoTooltip}>*/}
                        {/*        <button className={`${styles.button1} `} onClick={redo}*/}
                        {/*                style={{color: isredoClicked ? '#f9b331' : '#dbdbdb'}}>*/}
                        {/*            <FontAwesomeIcon icon={faRedoAlt} className={`${styles.iconstyly}  `}/>*/}

                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={removeObject}>*/}

                        {/*        <button className={`${styles.button1} `} onClick={removeSelectedObject}*/}
                        {/*                style={{color: isremoveSelectedObjectClicked ? '#f9b331' : '#dbdbdb'}}>*/}

                        {/*            <FontAwesomeIcon icon={faEraser} className={`${styles.iconstyly} `}/>*/}
                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}
                        {/*    <OverlayTrigger overlay={clearAll}>*/}
                        {/*        /!* <button   className={`${styles.button1} `}   onClick={clear} style={{ color: isclearClicked ? '#f9b331' : '#dbdbdb' }}  > *!/*/}
                        {/*        <button className={`${styles.button1} `} onClick={clear} style={{color: '#dbdbdb'}}>*/}
                        {/*            <FontAwesomeIcon icon={faTrash} className={`${styles.iconstyly} `}/>*/}
                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}

                        {/*    /!* Save button *!/*/}
                        {/*    <OverlayTrigger overlay={Save} >*/}
                        {/*        <button className={`${styles.button1} d-none`} onClick={() => {*/}
                        {/*            handlesave();*/}

                        {/*        }}>*/}

                        {/*            <FontAwesomeIcon icon={faSave} className={`${styles.iconstyly} `}*/}
                        {/*                             style={{color: '#dbdbdb'}}/>*/}
                        {/*        </button>*/}
                        {/*    </OverlayTrigger>*/}


                        {/*    <label>*/}
                        {/*        <OverlayTrigger placement="top" overlay={colorTooltip}>*/}
                        {/*            <input*/}
                        {/*                className='mt-1'*/}
                        {/*                style={{width: '38px', height: '20px'}}*/}
                        {/*                type="color"*/}
                        {/*                value={color}*/}
                        {/*                onChange={(e) => setColor(e.target.value)}*/}

                        {/*            />*/}
                        {/*        </OverlayTrigger>*/}
                        {/*    </label>*/}


                        {/*</div>*/}
                        <OverlayTrigger overlay={<Tooltip id="tooltip-video"> Click to Open the Video</Tooltip>}>
                            <FontAwesomeIcon icon={faQrcode}
                                             className={`${styles.icon}  p-2`}
                                             onClick={toggleVideoModal}
                                             style={{
                                                 position: 'absolute',
                                                 top: '620px',
                                                 left: '4%',
                                                 transform: 'translateX(-50%)',
                                                 zIndex: '9999',
                                                 cursor: 'pointer',
                                                 fontSize: '80px',
                                                 color: '#074773',
                                                 // color: '#545454',
                                                 // backgroundColor :'#fff',

                                             }}/>
                        </OverlayTrigger>
                        <Modal show={showVideoModal} onHide={toggleVideoModal}>
                            {/* Content of your video modal */}
                            {/* Content of your video modal */}
                            <video controls style={{ width: '100%' }}>
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video element.
                            </video>

                            {/* <iframe
          title="YouTube Video"
          width="100%"
          height="315"
        //   src="video.mp4"
        src="../../assets/video.mp4"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
                        </Modal>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-audio">click to listen the Audio</Tooltip>}>
                            <FontAwesomeIcon icon={faVolumeUp}
                                             className={`${styles.icon} `}
                                             onClick={handleAudioClick}
                                             style={{
                                                 position: 'absolute',
                                                 top: '170px',
                                                 left: '25%',
                                                 transform: 'translateX(-50%)',
                                                 zIndex: '9999',
                                                 cursor: 'pointer',
                                                 fontSize: '30px',
                                                 color: '#074773',
                                             }}
                            />
                        </OverlayTrigger>

                        {/* Container for icon and image */}

                        <div className={`d-flex w-100 flex-row p-0 h-100`} style={{position: 'absolute'}}>
                            <img src={image2}  className={`w-50 h-100`}/>
                            <img src={image}  className={`w-50 h-100`}/>
                        </div>
                        {/* Audio player */}
                        {isAudioPlaying && (
                            <audio controls style={{ position: 'absolute', top: '30%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: '9998' }}>
                                <source src="Seasons.mp3" type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        {/*<img src={image} alt="page11" style={{ position: 'absolute' }} className={`p-0 m-0 w-100`} />*/}

                        <FabricJSCanvas className="sample-canvas p-0 m-0 "
                                        style={{position: 'relative', top: '0', left: '0', zIndex: '7777'}}
                                        onReady={onReady}/>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Page8;


