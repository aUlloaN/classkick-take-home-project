import React, { FC, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './canvas.module.css';
import { ERASER_COLOR, ERASER_SIZE } from '../../constants';
import { ToolType } from '../../types';

interface CanvasProps {
  tool: ToolType;
  color: string;
  size: number;
}

export const Canvas: FC<CanvasProps> = ({ tool, color, size }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  
  const [drawing, setDrawing] = useState(false);
  
  const textMode = tool === ToolType.Text;

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
    if (!drawing || textMode) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setDrawing(false);
      ctx.closePath();
    }
  };

  const showInputText = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!textMode) return;

    const textInput = textInputRef.current;
    if (textInput) {
      textInput.style.display = 'inline-block';
      textInput.style.position = 'absolute';
      textInput.style.left = `${nativeEvent.offsetX}px`;
      textInput.style.top = `${nativeEvent.offsetY}px`;
      textInput.style.fontSize = `${size * 10}px`;
      textInput.style.width = `${size * 50}px`;
      textInput.style.height = `${size * 10 * 7/8}px`;
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

  const drawText = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const ctx = canvasRef.current?.getContext('2d');
      const textInput = textInputRef.current;
      if (ctx && textInput) {
        const text = textInput.value;
        const posX = Number(textInput.style.left.replace('px', ''));
        const posY = Number(textInput.style.top.replace('px', ''));
        ctx.textBaseline = "top";
        ctx.fillStyle = color;
        ctx.font = `${size * 10}px Arial, Helvetica, sans-serif`;
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
    if (ctx && !textMode) {
      ctx.strokeStyle = tool === ToolType.Eraser ? ERASER_COLOR : color;
      ctx.lineWidth = tool === ToolType.Eraser ? ERASER_SIZE : size;
    }
  }, [tool, color, size]);

  return (
    <div className={styles.container}>
      <input
        className={styles.textbox}
        ref={textInputRef}
        type="text"
        placeholder="Enter text"
        onBlur={hideInput}
        onKeyUp={drawText}
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
        onClick={showInputText}
      />
    </div>
  );
};
