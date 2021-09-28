/**
 * @jest-environment jsdom
 */

import React, { Component } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoadingOverlay from '../src';

jest.useFakeTimers();

class DelayedInactive extends Component<any, { active: boolean }> {
  timer: any;

  constructor(props: any) {
    super(props);
    this.state = { active: true };
  }
  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ active: false }), 600);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return <LoadingOverlay {...this.props} active={this.state.active} />;
  }
}

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
    render(
      <LoadingOverlay
        active
        onClick={() => {
          clicked = true;
        }}
      />
    );
    userEvent.click(screen.getByTestId('overlay'));
    expect(clicked).toBe(true);
  });

  it('removes self from DOM when not active', () => {
    render(<DelayedInactive />);
    // expect(screen.getByTestId('wrapper').children.length).toBe(1)
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.getByTestId('wrapper')).toBeEmptyDOMElement();
  });

  it('remains in dom when inactive if animate is true', () => {
    render(<DelayedInactive />);
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runOnlyPendingTimers();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.getByTestId('wrapper')).toBeEmptyDOMElement();
  });
});
