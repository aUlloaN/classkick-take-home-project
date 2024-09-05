import React, { useRef, useState, MouseEvent, useEffect } from "react";
import Tools from "./components/Tools";
import styles from './blackboard.module.css';
import { ERASER_COLOR, ERASER_TOOL_ALIAS, PENCIL_COLOR, PENCIL_TOOL_ALIAS } from "./constants";
import { Tool } from "./types";

export const Blackboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tool, setTool] = useState<Tool>(PENCIL_TOOL_ALIAS);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
      setDrawing(true);
    }
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && drawing) {
      ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
      ctx.stroke();
    };
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && drawing) {
      ctx.closePath();
      setDrawing(false);
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
      if (tool === ERASER_TOOL_ALIAS) {
        ctx.strokeStyle = ERASER_COLOR;
        ctx.lineWidth = 20;
      } else {
        ctx.strokeStyle = PENCIL_COLOR;
        ctx.lineWidth = 2;
      }
    }
  }, [tool]);

  return (
    <div>
      <Tools onChange={setTool} />
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={450}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};
