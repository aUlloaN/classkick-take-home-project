import { FC } from 'react';
import { EraserIcon, PencilIcon, TextIcon } from 'hugeicons-react';
import styles from './tools.module.css';
import { Tool } from '../../types';

interface ToolButtonProps {
  tool: Tool;
  isActive: boolean;
  onClick: () => void;
}

const ICON = {
  pencil: PencilIcon,
  eraser: EraserIcon,
  text: TextIcon,
};

export const ToolButton: FC<ToolButtonProps> = ({ tool, isActive, onClick }) => {
  const Icon = ICON[tool];

  if (!Icon) {
    return null;
  }

  return (
    <button
      className={`${styles.toolButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <Icon size={32} />
    </button>
  );
};
