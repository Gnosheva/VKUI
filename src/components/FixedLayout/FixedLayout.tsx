import React, { HTMLAttributes, RefCallback } from 'react';
import getClassName from '../../helpers/getClassName';
import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';
import { transitionEndEventName, TransitionStartEventDetail, transitionStartEventName } from '../View/View';
import withContext from '../../hoc/withContext';
import { HasPlatform, HasRootRef } from '../../types';
import withPlatform from '../../hoc/withPlatform';
import withPanelContext from '../Panel/withPanelContext';
import { setRef } from '../../lib/utils';
import { SplitColContext, SplitColContextProps } from '../SplitCol/SplitCol';

export interface FixedLayoutProps extends
  HTMLAttributes<HTMLDivElement>,
  HasRootRef<HTMLDivElement>,
  HasPlatform {
  vertical?: 'top' | 'bottom';
  /**
   * Это свойство определяет, будет ли фон компонента окрашен в цвет фона контента.
   * Это часто необходимо для фиксированных кнопок в нижней части экрана.
   */
  filled?: boolean;
  /**
   * @ignore
   */
  panel?: string;
  /**
   * @ignore
   */
  splitCol?: SplitColContextProps;
}

export interface FixedLayoutState {
  position: 'absolute' | null;
  top: number;
  width: string;
}

class FixedLayout extends React.Component<FixedLayoutProps, FixedLayoutState> {
  state: FixedLayoutState = {
    position: 'absolute',
    top: null,
    width: '',
  };

  el: HTMLDivElement;

  static contextTypes = {
    document: PropTypes.any,
    window: PropTypes.any,
  };

  private onMountResizeTimeout: number;

  get document() {
    return this.context.document || document;
  }

  get window() {
    return this.context.window || window;
  }

  get currentPanel(): HTMLElement {
    const { panel: id } = this.props;
    const elem = this.document.getElementById(id);

    if (!elem) {
      console.warn(`Element #${id} not found`);
    }

    return elem;
  }

  get canTargetPanelScroll() {
    const panelEl = this.currentPanel;
    if (!panelEl) {
      return true; // Всегда предпологаем, что может быть скролл в случае, если нет document
    }
    return panelEl.scrollHeight > panelEl.clientHeight;
  }

  componentDidMount() {
    this.onMountResizeTimeout = setTimeout(() => this.doResize());
    this.window.addEventListener('resize', this.doResize);

    this.document.addEventListener(transitionStartEventName, this.onViewTransitionStart);
    this.document.addEventListener(transitionEndEventName, this.onViewTransitionEnd);
  }

  componentWillUnmount() {
    clearInterval(this.onMountResizeTimeout);
    this.window.removeEventListener('resize', this.doResize);

    this.document.removeEventListener(transitionStartEventName, this.onViewTransitionStart);
    this.document.removeEventListener(transitionEndEventName, this.onViewTransitionEnd);
  }

  onViewTransitionStart: EventListener = (e: CustomEvent<TransitionStartEventDetail>) => {
    let panelScroll = e.detail.scrolls[this.props.panel] || 0;
    const fromPanelHasScroll = this.props.panel === e.detail.from && panelScroll > 0;
    const toPanelHasScroll = this.props.panel === e.detail.to && panelScroll > 0;

    // Для панелей, с которых уходим всегда выставляется скролл
    // Для панелей на которые приходим надо смотреть, есть ли браузерный скролл
    if (fromPanelHasScroll || toPanelHasScroll && this.canTargetPanelScroll) {
      this.setState({
        position: 'absolute',
        top: this.el.offsetTop + panelScroll,
        width: '',
      });
    }
  };

  onViewTransitionEnd: VoidFunction = () => {
    this.setState({
      position: null,
      top: null,
    });

    this.doResize();
  };

  doResize = () => {
    const { colRef } = this.props.splitCol;

    if (colRef && colRef.current) {
      const node: HTMLElement = colRef.current;
      const width = node.offsetWidth;

      this.setState({ width: `${width}px`, position: null });
    } else {
      this.setState({ width: '', position: null });
    }
  };

  getRef: RefCallback<HTMLDivElement> = (element) => {
    this.el = element;
    setRef(element, this.props.getRootRef);
  };

  render() {
    const { className, children, style, vertical, getRootRef, platform, filled, splitCol, panel, ...restProps } = this.props;

    return (
      <div
        {...restProps}
        ref={this.getRef}
        className={classNames(getClassName('FixedLayout', platform), {
          'FixedLayout--filled': filled,
        }, `FixedLayout--${vertical}`, className)}
        style={{ ...style, ...this.state }}
      >
        <div className="FixedLayout__in">{children}</div>
      </div>
    );
  }
}

export default withContext(
  withPlatform(withPanelContext(FixedLayout)),
  SplitColContext,
  'splitCol',
);
