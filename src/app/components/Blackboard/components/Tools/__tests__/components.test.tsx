import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolButton, Customizers } from '../components';
import { ToolType } from '../../../types';

describe('ToolButton', () => {
  it('renders correctly with Pencil tool', () => {
    render(<ToolButton tool={ToolType.Pencil} isActive={false} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /pencil tool/i })).toBeInTheDocument();
  });

  it('renders correctly with Text tool', () => {
    render(<ToolButton tool={ToolType.Text} isActive={true} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /text tool/i })).toBeInTheDocument();
  });

  it('renders correctly with Eraser tool', () => {
    render(<ToolButton tool={ToolType.Eraser} isActive={false} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /eraser tool/i })).toBeInTheDocument();
  });

  it('renders null for unknown tool', () => {
    render(<ToolButton tool={'Unknown' as ToolType} isActive={false} onClick={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    render(<ToolButton tool={ToolType.Pencil} isActive={true} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /pencil tool/i })).toHaveClass('active');
  });
});

describe('Customizers', () => {
  it('renders color and size inputs', () => {
    render(<Customizers color="#000000" size={5} onColorChange={() => {}} onSizeChange={() => {}} />);
    expect(screen.getByLabelText('Color Input')).toBeInTheDocument();
    expect(screen.getByLabelText('Size Input')).toBeInTheDocument();
  });
});
