import React, { FC } from 'react';
import { Customizers, ToolButton } from './components';
import styles from './tools.module.css';
import { ToolType } from '../../types';

interface ToolsProps {
  tool: ToolType;
  color: string;
  size: number;
  onToolChange: (tool: ToolType) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export const Tools: FC<ToolsProps> = ({ tool, color, size, onToolChange, onColorChange, onSizeChange }) => {
  const toolTypes = Object.values(ToolType);

  return (
    <div className={styles.container}>
      <nav role="toolbar" aria-label="Drawing Tools">
        {toolTypes.map((toolType) => (
          <ToolButton
            key={toolType}
            tool={toolType}
            isActive={tool === toolType}
            onClick={() => onToolChange(toolType)}
          />
        ))}
      </nav>
      {tool !== ToolType.Eraser && (
        <Customizers
          color={color}
          size={size}
          onColorChange={onColorChange}
          onSizeChange={onSizeChange}
        />
      )}
    </div>
  );
};
