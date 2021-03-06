import { render, RenderResult, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';

export type ComponentTestOptions = {
  defaultProps?: any;
  forward?: boolean;
  domAttr?: boolean;
  className?: boolean;
  style?: boolean;
};

type BasicProps = { style?: any; className?: string };

export function baselineComponent<Props extends BasicProps>(
  RawComponent: ComponentType<Props>,
  {
    forward = true,
    style = true,
    className = true,
    domAttr = true,
  }: ComponentTestOptions = {},
) {
  const Component: ComponentType<BasicProps> = RawComponent;
  it('renders', () => {
    let api: RenderResult;
    // mount
    expect(() => api = render(<Component />)).not.toThrow();
    // update
    expect(() => api.rerender(<Component />)).not.toThrow();
    // unmount
    expect(() => api.unmount()).not.toThrow();
  });
  forward && it('forwards attributes', () => {
    render(<Component data-testid="__cmp__" className="__cls__" style={{ background: 'red' }} />);
    // forward DOM attributes
    domAttr && expect(screen.queryByTestId('__cmp__')).toBeTruthy();
    const styledNode = document.querySelector('.__cls__');
    // forwards className
    className && expect(styledNode).toBeTruthy();
    // forwards style
    style && expect((styledNode as HTMLElement).style.background).toBe('red');
  });
}
