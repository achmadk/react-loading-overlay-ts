import { createRef, forwardRef, PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, CSSInterpolation, cx } from '@emotion/css';
import { TransitionStatus } from 'react-transition-group/Transition';

import Spinner, { SpinnerProps } from './components/Spinner';

import STYLES, { Styles } from './styles';
import {
  LoadingOverLayProps,
  LoadingOverlayState,
  OverflowCSS,
} from './LoadingOverlayTypes';

export { LoadingOverLayProps } from './LoadingOverlayTypes';

class LoadingOverlayWrapperBase extends PureComponent<
  LoadingOverLayProps,
  LoadingOverlayState
> {
  static displayName = 'LoadingOverlay';

  wrapperEl: HTMLElement | null | undefined = null;

  overlayRef = createRef<HTMLDivElement>();

  state = { overflowCSS: undefined };

  componentDidMount() {
    this.wrapperEl = this.overlayRef.current?.parentElement;
    if (this.wrapperEl !== null && this.wrapperEl !== undefined) {
      const wrapperStyle = window.getComputedStyle(this.wrapperEl);
      const overflowCSS = (
        ['overflow', 'overflowX', 'overflowY'] as Array<keyof OverflowCSS>
      ).reduce<OverflowCSS>((m, i) => {
        if (wrapperStyle[i] !== 'visible') m[i] = 'hidden';
        return m;
      }, {} as OverflowCSS);
      this.setState({ overflowCSS });
    }
  }

  componentDidUpdate(prevProps: LoadingOverLayProps) {
    const { active } = this.props;
    if (active !== prevProps.active && this.wrapperEl) {
      this.wrapperEl.scrollTop = 0;
    }
  }

  /**
   * Return an emotion css object for a given element key
   * If a custom style was provided via props, run it with
   * the base css obj.
   */
  getStyles = (
    key: keyof Styles,
    providedState?: OverflowCSS | TransitionStatus
  ) => {
    const { styles = {} } = this.props;
    const base = STYLES?.[key]?.(providedState, this.props);
    const custom: Styles[keyof Styles] | boolean =
      (styles as Styles)?.[key] ?? false;
    if (!custom) return base;
    return (
      typeof custom === 'function' ? custom(base, this.props) : custom
    ) as CSSInterpolation | TemplateStringsArray;
  };

  /**
   * Convenience cx wrapper to add prefix classes to each of the child
   * elements for styling purposes.
   */
  cx = (names: string | Array<string | false | undefined>, ...args: any) => {
    const { classNamePrefix = '_loading_overlay_' } = this.props;
    const arr = Array.isArray(names) ? names : [names];
    return cx(
      ...arr.map((name) => (name ? `${classNamePrefix}${name}` : '')),
      ...args
    );
  };

  render() {
    const { overflowCSS } = this.state;
    const {
      children,
      className,
      onClick,
      active,
      fadeSpeed = 500,
      spinner = true,
      text,
      innerRef,
    } = this.props;

    return (
      <div
        data-testid="wrapper"
        ref={innerRef}
        className={this.cx(
          ['wrapper', active && 'wrapper--active'],
          css(
            this.getStyles(
              'wrapper',
              active ? overflowCSS : undefined
            ) as CSSInterpolation
          ),
          className
        )}
      >
        <CSSTransition
          in={active}
          classNames="_loading-overlay-transition"
          timeout={fadeSpeed!}
          unmountOnExit
        >
          {(state) => (
            <div
              ref={this.overlayRef}
              data-testid="overlay"
              className={this.cx(
                'overlay',
                css(this.getStyles('overlay', state) as CSSInterpolation)
              )}
              onClick={onClick}
            >
              <div
                className={this.cx(
                  'content',
                  css(this.getStyles('content') as CSSInterpolation)
                )}
              >
                {spinner &&
                  (typeof spinner === 'boolean' ? (
                    <Spinner
                      cx={this.cx}
                      getStyles={this.getStyles as SpinnerProps['getStyles']}
                    />
                  ) : (
                    spinner
                  ))}
                {text}
              </div>
            </div>
          )}
        </CSSTransition>
        {children}
      </div>
    );
  }
}

const LoadingOverlayWrapper = forwardRef<HTMLDivElement, LoadingOverLayProps>(
  (props, ref) => <LoadingOverlayWrapperBase innerRef={ref} {...props} />
);

export default LoadingOverlayWrapper;
