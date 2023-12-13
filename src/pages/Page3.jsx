import React, { useRef, useEffect, useState } from 'react';

const Page3 = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState(null); // 'circle', 'line', 'text', or 'freehand'
  const [size, setSize] = useState(10); // Initial size
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState([]); // Array to store drawn shapes
  const [eraseMode, setEraseMode] = useState(false);
  const [color, setColor] = useState('#000000'); // Initial color
  const [text, setText] = useState(''); // Text to be drawn
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState([]); // For freehand drawing

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const startDrawing = (event) => {
      const { clientX, clientY } = event;
      const { left, top } = canvas.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;

      if (tool === 'text') {
        setTextPosition({ x: offsetX, y: offsetY });
      } else if (tool === 'freehand') {
        setIsDrawing(true);
        setPath([{ x: offsetX, y: offsetY }]);
      } else {
        setIsDrawing(true);
        setStartPos({ x: offsetX, y: offsetY });
      }
    };

   const draw = (event) => {
  if (!isDrawing) return;

  const { clientX, clientY } = event;
  const { left, top } = canvas.getBoundingClientRect();
  const offsetX = clientX - left;
  const offsetY = clientY - top;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = color;

  if (tool === 'circle') {
    const distance = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
    setSize(distance);
    ctx.arc(startPos.x, startPos.y, size, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (tool === 'line') {
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  } else if (tool === 'text') {
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, textPosition.x, textPosition.y);
  } else if (tool === 'freehand') {
    setPath([...path, { x: offsetX, y: offsetY }]);
    ctx.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.stroke();
  }

  if (eraseMode) {
    // Draw shapes drawn after the last mouse down event
    shapes.forEach((shape) => {
      if (shape.tool === 'circle' && shape.startPos.x !== startPos.x) {
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.arc(shape.startPos.x, shape.startPos.y, shape.size, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (shape.tool === 'line' && shape.startPos.x !== startPos.x) {
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.moveTo(shape.startPos.x, shape.startPos.y);
        ctx.lineTo(shape.endPos.x, shape.endPos.y);
        ctx.stroke();
      } else if (shape.tool === 'text' && shape.textPosition.x !== textPosition.x) {
        ctx.font = `${shape.size}px Arial`;
        ctx.fillText(shape.text, shape.textPosition.x, shape.textPosition.y);
      } else if (shape.tool === 'freehand' && shape.path[0].x !== path[0].x) {
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.moveTo(shape.path[0].x, shape.path[0].y);

        for (let i = 1; i < shape.path.length; i++) {
          ctx.lineTo(shape.path[i].x, shape.path[i].y);
        }

        ctx.stroke();
      }
    });
  }
};


    const stopDrawing = () => {
      setIsDrawing(false);
      if (!eraseMode && tool !== 'text') {
        // Store the drawn shape
        if (tool === 'freehand') {
          setShapes([...shapes, { tool, path, size, color }]);
        } else {
          setShapes([...shapes, { tool, startPos, endPos: { x: posX, y: posY }, size, color }]);
        }
      } else if (tool === 'text') {
        setShapes([...shapes, { tool, text, textPosition, size, color }]);
        setText(''); // Clear text after drawing
      }
    };


    const handleSave = () => {
      const json = JSON.stringify(shapes);
      console.log(shapes)
   }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, [isDrawing, tool, size, startPos, eraseMode, shapes, color, text, textPosition, path]);

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    setSize(10); // Reset size when switching tools
    setEraseMode(false); // Disable erase mode when switching tools
  };

  const handleEraseMode = () => {
    setEraseMode(!eraseMode);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='m-5'>
      <div className='m-5'>
        <button onClick={() => handleToolChange('circle')}>Draw Circle</button>
        <button onClick={() => handleToolChange('line')}>Draw Line</button>
        <button onClick={() => handleToolChange('text')}>Add Text</button>
        <button onClick={() => handleToolChange('freehand')}>Freehand</button>
        <button onClick={handleEraseMode}>Erase</button>
        <input type="color" value={color} onChange={handleColorChange} />
        {tool === 'text' && (
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
            style={{ position: 'absolute', left: textPosition.x, top: textPosition.y }}
          />
        )}
        <canvas ref={canvasRef} width={300} height={600} style={{ border: '1px solid #000' }} />
      </div>
    </div>
  );
};

export default Page3;
