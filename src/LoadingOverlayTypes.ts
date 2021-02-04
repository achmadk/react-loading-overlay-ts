import { CSSInterpolation } from '@emotion/css';
import { MouseEvent, ReactNode, Ref, CSSProperties } from 'react';

import { Styles, StyleKeys } from './styles';

export type LoadingOverLayProps = {
  /**
   * whether the loader is visible
   * @default true
   *
   * @type {boolean}
   */
  active?: boolean;

  /**
   * the transition speed for fading out the overlay
   * @default 500
   *
   * @type {number}
   */
  fadeSpeed?: number;

  /**
   * click handler for the overlay when active
   * @default undefined
   *
   */
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void | Promise<void>;

  /**
   * className for the wrapping `<div />` that is present whether active or not.
   * @default undefined
   *
   * @type {string}
   */
  className?: string;

  /**
   * the prefix for all classNames on the generated elements.
   * see [Styling](#styles-with-css) for more info.
   * @default _loading_overlay_
   *
   * @type {string}
   */
  classNamePrefix?: string;

  /**
   * renders the default spinner when `true` and when the loader is `active`.
   * Otherwise you can provide any valid react node to [use your own spinner](#custom-spinner).
   * @default true
   *
   * @type {(boolean | ReactNode)}
   */
  spinner?: boolean | ReactNode;

  /**
   * the text or react node to render in the loader overlay when active.
   * @default undefined
   *
   * @type {ReactNode}
   */
  text?: ReactNode;

  /**
   * see [Styling](#styles-with-emotion) for more info.
   * @default undefined
   *
   * @type {Styles}
   */
  styles?: Record<
    StyleKeys,
    Styles[StyleKeys] | CSSInterpolation | TemplateStringsArray
  >;

  /**
   *
   *
   * @type {ReactNode}
   */
  children?: ReactNode;

  /**
   *
   *
   * @type {Ref<HTMLDivElement>}
   */
  innerRef?: Ref<HTMLDivElement>;
};

export type OverflowCSS = {
  overflow: CSSProperties['overflow'];
  overflowX: CSSProperties['overflowX'];
  overflowY: CSSProperties['overflowY'];
};

export type LoadingOverlayState = {
  overflowCSS?: OverflowCSS;
};

export type LoadingOverlayDefaultProps = {
  classNamePrefix: string;
  fadeSpeed: number;
  styles: {};
};
