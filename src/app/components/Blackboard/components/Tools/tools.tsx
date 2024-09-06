import React, { ChangeEvent, FC } from 'react';
import { ToolButton } from './components';
import styles from './tools.module.css';
import { ERASER_TOOL_ALIAS, PENCIL_TOOL_ALIAS, TEXT_TOOL_ALIAS } from '../../constants';
import { Tool } from '../../types';

interface ToolsProps {
  tool: Tool;
  color: string;
  size: number;
  onToolChange: (tool: Tool) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export const Tools: FC<ToolsProps> = ({ tool, color, size, onToolChange, onColorChange, onSizeChange }) => {
  const isPencilMode = tool === PENCIL_TOOL_ALIAS;
  const isTextMode = tool === TEXT_TOOL_ALIAS;
  const isEraserMode = tool === ERASER_TOOL_ALIAS;

  return (
    <div className={styles.container}>
      <div className={styles.flexBox}>
        <ToolButton tool={PENCIL_TOOL_ALIAS} isActive={isPencilMode}  onClick={() => onToolChange(PENCIL_TOOL_ALIAS)} />
        <ToolButton tool={TEXT_TOOL_ALIAS} isActive={isTextMode} onClick={() => onToolChange(TEXT_TOOL_ALIAS)} />
        <ToolButton tool={ERASER_TOOL_ALIAS} isActive={isEraserMode} onClick={() => onToolChange(ERASER_TOOL_ALIAS)} />
      </div>
      <div className={`${isEraserMode ? styles.hide : styles.customizers}`}>
        <div className={styles.flexBox}>
          <label>Color:</label>
          <input
            className={styles.colorInput}
            type="color"
            value={color}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onColorChange(e.target.value)}
          />
        </div>
        <div className={styles.flexBox}>
          <label>Size:</label>
          <input
            className={styles.sizeInput}
            type="range"
            value={size}
            min="2"
            max="10"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSizeChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
