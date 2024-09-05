import { FC } from 'react';
import { EraserIcon, PencilIcon, TextIcon } from 'hugeicons-react';
import { Tool } from '../../types';

interface ToolButtonProps {
  tool: Tool;
  onClick: () => void;
}

const ICON = {
  pencil: PencilIcon,
  eraser: EraserIcon,
  text: TextIcon,
};

export const ToolButton: FC<ToolButtonProps> = ({ tool, onClick }) => {
  const Icon = ICON[tool];

  if (!Icon) {
    return null;
  }

  return (
    <button onClick={onClick}>
      <Icon size={32} />
    </button>
  );
};
