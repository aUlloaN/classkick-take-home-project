import React, { useState } from 'react';
import Tools from './components/Tools';
import Canvas from './components/Canvas';
import { DEFAULT_COLOR, DEFAULT_SIZE } from './constants';
import { ToolType } from './types';

export const Blackboard = () => {
  const [tool, setTool] = useState<ToolType>(ToolType.Pencil);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [size, setSize] = useState<number>(DEFAULT_SIZE);

  return (
    <div>
      <Tools
        tool={tool}
        color={color}
        size={size}
        onToolChange={setTool}
        onColorChange={setColor}
        onSizeChange={setSize}
      />
      <Canvas
        tool={tool}
        color={color}
        size={size}
      />
    </div>
  );
};
