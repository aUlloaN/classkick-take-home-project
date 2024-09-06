import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tools } from '../tools';
import { ToolType } from '../../../types';

describe('Tools', () => {
  it('renders all tool buttons', () => {
    render(
      <Tools
        tool={ToolType.Pencil}
        color="#000000"
        size={5}
        onToolChange={() => {}}
        onColorChange={() => {}}
        onSizeChange={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /pencil tool/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /text tool/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eraser tool/i })).toBeInTheDocument();

    expect(screen.getByLabelText('Color Input')).toBeInTheDocument();
    expect(screen.getByLabelText('Size Input')).toBeInTheDocument();
  });

  it('does not render customizers when tool is eraser', () => {
    render(
      <Tools
        tool={ToolType.Eraser}
        color="#000000"
        size={5}
        onToolChange={() => {}}
        onColorChange={() => {}}
        onSizeChange={() => {}}
      />
    );
    expect(screen.queryByLabelText('Color Input')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Size Input')).not.toBeInTheDocument();
  });

  it('calls onToolChange when tool button is clicked', () => {
    const onToolChange = jest.fn();
    render(
      <Tools
        tool={ToolType.Pencil}
        color="#000000"
        size={5}
        onToolChange={onToolChange}
        onColorChange={() => {}}
        onSizeChange={() => {}}
      />
    );
    screen.getByRole('button', { name: /text tool/i }).click();
    expect(onToolChange).toHaveBeenCalledWith(ToolType.Text);
  });
});
