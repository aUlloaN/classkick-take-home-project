import React, { ChangeEvent, FC } from 'react';
import { EraserIcon, PencilIcon, TextIcon } from 'hugeicons-react';
import styles from './tools.module.css';
import { ToolType } from '../../types';

interface ToolButtonProps {
  tool: ToolType;
  isActive: boolean;
  onClick: () => void;
}

const ICON = {
  [ToolType.Pencil]: PencilIcon,
  [ToolType.Text]: TextIcon,
  [ToolType.Eraser]: EraserIcon,
};

export const ToolButton: FC<ToolButtonProps> = ({ tool, isActive, onClick }) => {
  const Icon = ICON[tool];

  if (!Icon) return null;

  return (
    <button
      className={`${styles.toolButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <Icon size={32} />
    </button>
  );
};

interface CustomizersProps {
  color: string;
  size: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export const Customizers: FC<CustomizersProps> = ({ color, size, onColorChange, onSizeChange }) => (
  <div className={styles.customizers}>
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
);
