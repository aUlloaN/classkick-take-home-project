import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Canvas } from '../canvas';
import { ToolType } from '../../../types';

describe('Canvas Component', () => {
  const defaultProps = {
    tool: ToolType.Pencil,
    color: '#000000',
    size: 10,
  };

  it('renders the canvas element', () => {
    render(<Canvas {...defaultProps} />);
    const canvasElement = screen.getByLabelText('Drawing Canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  it('renders the text input element', () => {
    render(<Canvas {...defaultProps} />);
    const textInputElement = screen.getByRole('textbox');
    expect(textInputElement).toBeInTheDocument();
  });

  describe('Drawing Functionality', () => {
    it('should start drawing on mouse down', () => {
      render(<Canvas {...defaultProps} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;
      
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      Object.defineProperties(event, {
        offsetX: { value: 100 },
        offsetY: { value: 50 },
      });
      fireEvent(canvasElement, event);
      
      const ctx = canvasElement.getContext('2d');
      expect(ctx?.beginPath).toHaveBeenCalledTimes(1);
      expect(ctx?.moveTo).toHaveBeenCalledWith(100, 50);
    });

    it('should draw on mouse move', () => {
      render(<Canvas {...defaultProps} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;
      
      fireEvent.mouseDown(canvasElement);
      const event = new MouseEvent('mousemove', { bubbles: true, cancelable: true });
      Object.defineProperties(event, {
        offsetX: { value: 150 },
        offsetY: { value: 100 },
      });
      fireEvent(canvasElement, event);
      
      const ctx = canvasElement.getContext('2d');
      expect(ctx?.lineTo).toHaveBeenCalledWith(150, 100);
      expect(ctx?.stroke).toHaveBeenCalled();
    });

    it('should stop drawing on mouse up', () => {
      render(<Canvas {...defaultProps} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;
      fireEvent.mouseDown(canvasElement);
      fireEvent.mouseMove(canvasElement);
      fireEvent.mouseUp(canvasElement);
      const ctx = canvasElement.getContext('2d');
      expect(ctx?.closePath).toHaveBeenCalledTimes(1);
    });

    it('should stop drawing on mouse leave', () => {
      render(<Canvas {...defaultProps} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;
      fireEvent.mouseDown(canvasElement);
      fireEvent.mouseMove(canvasElement);
      fireEvent.mouseLeave(canvasElement);
      const ctx = canvasElement.getContext('2d');
      expect(ctx?.closePath).toHaveBeenCalledTimes(1);
    });
  });

  describe('Text Functionality', () => {
    it('should show text input on click in text mode', () => {
      render(<Canvas {...defaultProps} tool={ToolType.Text} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas');
      const textInputElement = screen.getByRole('textbox');

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperties(event, {
        offsetX: { value: 100 },
        offsetY: { value: 50 },
      });
      fireEvent(canvasElement, event);

      expect(textInputElement).toHaveStyle({
        display: 'inline-block',
        position: 'absolute',
        left: '100px',
        top: '50px',
        'font-size': '100px',
        width: '500px',
        height: '87.5px',
      });
    });

    it('should draw text on enter and hide text input', () => {
      render(<Canvas {...defaultProps} tool={ToolType.Text} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;
      const textInputElement = screen.getByRole('textbox');

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperties(event, {
        offsetX: { value: 100 },
        offsetY: { value: 50 },
      });
      fireEvent(canvasElement, event);
      
      fireEvent.change(textInputElement, { target: { value: 'Test Text' } });
      fireEvent.keyUp(textInputElement, { key: 'Enter', code: 'Enter' });

      const ctx = canvasElement.getContext('2d');
      expect(ctx?.textBaseline).toBe('top');
      expect(ctx?.fillStyle).toBe('#000000');
      expect(ctx?.font).toBe('100px Arial, Helvetica, sans-serif');
      expect(ctx?.fillText).toHaveBeenCalledWith('Test Text', 100, 50);
      expect(textInputElement).toHaveStyle('display: none');
    });

    it('should hide text input on blur', () => {
      render(<Canvas {...defaultProps} tool={ToolType.Text} />);
      const canvasElement = screen.getByLabelText('Drawing Canvas');
      const textInputElement = screen.getByRole('textbox');
  
      fireEvent.click(canvasElement);
      fireEvent.blur(textInputElement);
  
      expect(textInputElement).toHaveStyle('display: none');
    });
  });

  describe('Eraser Functionality', () => {
    it('should erase content on mouse move with eraser tool', () => {
      render(<Canvas {...defaultProps} tool={ToolType.Eraser} />);

      const canvasElement = screen.getByLabelText('Drawing Canvas') as HTMLCanvasElement;

      const eventDown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      Object.defineProperties(eventDown, {
        offsetX: { value: 100 },
        offsetY: { value: 50 },
      });
      fireEvent(canvasElement, eventDown);

      const eventMove = new MouseEvent('mousemove', { bubbles: true, cancelable: true });
      Object.defineProperties(eventMove, {
        offsetX: { value: 150 },
        offsetY: { value: 100 },
      });
      fireEvent(canvasElement, eventMove);
      
      const ctx = canvasElement.getContext('2d');
      expect(ctx?.strokeStyle).toBe('#ffffff');
      expect(ctx?.beginPath).toHaveBeenCalledTimes(1);
      expect(ctx?.moveTo).toHaveBeenCalledWith(100, 50);
      expect(ctx?.lineTo).toHaveBeenCalledWith(150, 100);
      expect(ctx?.stroke).toHaveBeenCalled();
    });
  });
});
