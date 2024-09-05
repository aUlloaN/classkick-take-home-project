import React, { useRef, useState, MouseEvent, useEffect, KeyboardEvent } from 'react';
import Tools from './components/Tools';
import styles from './blackboard.module.css';
import { DEFAULT_COLOR, DEFAULT_TEXT_SIZE, ERASER_COLOR, ERASER_TOOL_ALIAS, PENCIL_TOOL_ALIAS, TEXT_TOOL_ALIAS } from './constants';
import { Tool } from './types';

export const Blackboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const [tool, setTool] = useState<Tool>(PENCIL_TOOL_ALIAS);
  const [drawing, setDrawing] = useState(false);
  const [textMode, setTextMode] = useState(false); 

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (textMode) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setDrawing(true);
      ctx.beginPath();
      ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
    }
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || textMode) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
      ctx.stroke();
    };
  };

  const stopDrawing = () => {
    if (!drawing) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setDrawing(false);
      ctx.closePath();
    }
  };

  const addText = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!textMode) return;

    const ctx = canvasRef.current?.getContext('2d');
    const textInput = textInputRef.current;
    if (ctx && textInput) {
      textInput.style.display = 'inline-block';
      textInput.style.position = 'absolute';
      textInput.style.left = `${nativeEvent.offsetX}px`;
      textInput.style.top = `${nativeEvent.offsetY}px`;
      textInput.style.fontSize = `${DEFAULT_TEXT_SIZE}px`;
      textInput.focus();
    };
  };

  const hideInput = () => {
    const textInput = textInputRef.current;
    if (textInput) {
      textInput.value = '';
      textInput.style.display = 'none';
    }
  };

  const handleInputTextKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const ctx = canvasRef.current?.getContext('2d');
      const textInput = textInputRef.current;
      if (ctx && textInput) {
        const text = textInput.value;
        const posX = Number(textInput.style.left.replace('px', ''));
        const posY = Number(textInput.style.top.replace('px', ''));
        ctx.textBaseline = "top";
        ctx.fillStyle = DEFAULT_COLOR;
        ctx.font = `${DEFAULT_TEXT_SIZE}px Arial`;
        ctx.fillText(text, posX, posY);
        hideInput();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = ERASER_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (ctx) {
      setTextMode(tool === TEXT_TOOL_ALIAS);

      if (tool === ERASER_TOOL_ALIAS) {
        ctx.strokeStyle = ERASER_COLOR;
        ctx.lineWidth = 20;
      } else {
        ctx.strokeStyle = DEFAULT_COLOR;
        ctx.lineWidth = 2;
      }
    }
  }, [tool]);

  return (
    <div>
      <Tools onChange={setTool} />
      <div className={styles.container}>
        <input
          className={styles.textbox}
          ref={textInputRef}
          type="text"
          placeholder="Enter text"
          onBlur={hideInput}
          onKeyUp={handleInputTextKeyUp}
        />
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={450}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onClick={addText}
        />
      </div>
    </div>
  );
};
