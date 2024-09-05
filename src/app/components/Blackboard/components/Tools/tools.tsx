import { FC } from 'react';
import { ToolButton } from './components';
import styles from './tools.module.css';
import { ERASER_TOOL_ALIAS, PENCIL_TOOL_ALIAS, TEXT_TOOL_ALIAS } from '../../constants';
import { Tool } from '../../types';

interface ToolsProps {
  onChange: (tool: Tool) => void;
}

export const Tools: FC<ToolsProps> = ({ onChange }) => (
  <div className={styles.buttons}>
    <ToolButton tool={PENCIL_TOOL_ALIAS} onClick={() => onChange(PENCIL_TOOL_ALIAS)} />
    <ToolButton tool={TEXT_TOOL_ALIAS} onClick={() => onChange(TEXT_TOOL_ALIAS)} />
    <ToolButton tool={ERASER_TOOL_ALIAS} onClick={() => onChange(ERASER_TOOL_ALIAS)} />
  </div>
);
