import { EraserIcon, PencilIcon } from "hugeicons-react";
import { Tool } from "../../types";
import { FC } from "react";

interface ToolButtonProps {
  tool: Tool;
  onClick: () => void;
}

const ICON = {
  pencil: PencilIcon,
  eraser: EraserIcon,
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
