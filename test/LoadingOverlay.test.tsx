/**
 * @jest-environment jsdom
 */

import { useState, useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoadingOverlay, { LoadingOverLayProps } from '../src';

jest.useFakeTimers();

const DelayedInactive = (props: LoadingOverLayProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return <LoadingOverlay {...props} active={active} />;
};

describe('Loader DOM state', () => {
  it('is not in DOM initially if active:false', () => {
    render(<LoadingOverlay active={false} />);
    expect(screen.getByTestId('wrapper')).toBeEmptyDOMElement();
  });

  it('is in DOM initially if active:true', () => {
    render(<LoadingOverlay active />);
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  it('supports click events on overlay', () => {
    let clicked = false;
    const app = userEvent.setup();
    render(
      <LoadingOverlay
        active
        onClick={() => {
          clicked = true;
        }}
      />
    );
    act(async () => {
      await app.click(screen.getByTestId('overlay'));
      expect(clicked).toBe(false);
    });
  });

  it('removes self from DOM when not active', () => {
    render(<DelayedInactive />, { legacyRoot: true });
    // expect(screen.getByTestId('wrapper').children.length).toBe(1)
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.getByTestId('wrapper')).toBeEmptyDOMElement();
  });

  it('remains in dom when inactive if animate is true', () => {
    render(<DelayedInactive />, { legacyRoot: true });
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runOnlyPendingTimers();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.getByTestId('wrapper')).toBeEmptyDOMElement();
  });
});
