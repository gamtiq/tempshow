import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * Component to temporary show some elements.
 */
/**
 * Class of component to temporary show some elements.
 *
 * @extends {PureComponent}
 */

class TempShow extends PureComponent {
  /**
   * Component constructor.
   *
   * @param {object} props
   *      Initial props values.
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.hide = this.hide.bind(this);
  }
  /**
   * Component's lifecycle method that is invoked immediately after updating occurs.
   *
   * @param {object} prevProps
   *      Previous props values.
   * @param {object} prevState
   *      Previous state.
   */


  componentDidUpdate(prevProps, prevState) {
    const {
      props,
      state
    } = this;

    if (state.visible === prevState.visible) {
      const {
        visible
      } = props;

      if (visible !== state.visible) {
        if (visible) {
          this.show();
        } else {
          this.hide();
        }
      } else if (visible && (props.postponeAutoHide || props.autoHide !== prevProps.autoHide)) {
        this.show(props.autoHide);
      }
    }
  }
  /**
   * Component's lifecycle method that is invoked immediately before a component is unmounted and destroyed.
   */


  componentWillUnmount() {
    this.hide();
  }
  /**
   * Cancel component's early scheduled hiding.
   *
   * @return {TempShow}
   *      Reference to component's object (`this`).
   */


  cancelHide() {
    const timeoutId = this.hideTimeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.hideTimeoutId = null;
    }

    return this;
  }
  /**
   * Hide component.
   *
   * @see #cancelHide
   * @see #show
   */


  hide() {
    if (this.state.visible) {
      const {
        onHide
      } = this.props;
      this.cancelHide().setState({
        visible: false
      });

      if (onHide) {
        onHide(false, this);
      }
    }
  }
  /**
   * Show component.
   *
   * @param {number} [autoHideTime=this.props.autoHide]
   *      Number of seconds after which component should be hidden automatically.
   * @see #cancelHide
   * @see #hide
   */


  show(autoHideTime) {
    const {
      props
    } = this;
    const autoHide = typeof autoHideTime === 'number' ? autoHideTime : props.autoHide;
    this.cancelHide();

    if (autoHide > 0) {
      this.hideTimeoutId = setTimeout(this.hide, autoHide * 1000);
    }

    if (!this.state.visible) {
      this.setState({
        visible: true
      });

      if (props.onShow) {
        props.onShow(true, this);
      }
    }
  }
  /**
   * Toggle component's visibility.
   *
   * @see #hide
   * @see #show
   */


  toggleVisible() {
    if (this.state.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
  /**
   * Handle `blur` event on component.
   *
   * @param {SyntheticEvent} eventData
   *      Data about event.
   * @see #hide
   */


  handleBlur(eventData) {
    const {
      hideOnBlur
    } = this.props;

    if (hideOnBlur === true || hideOnBlur(eventData, this)) {
      eventData.preventDefault();
      eventData.stopPropagation();
      this.hide();
    }
  }
  /**
   * Handle mouse click on component.
   *
   * @param {SyntheticEvent} eventData
   *      Data about event.
   * @see #toggleVisible
   */


  handleClick(eventData) {
    const {
      props
    } = this;

    if (!this.state.visible || props.hideOnAnyClick || props.hideForClick(eventData, this)) {
      eventData.preventDefault();
      eventData.stopPropagation();
      this.toggleVisible();
    }
  }
  /**
   * Handle `focus` event on component.
   *
   * @param {SyntheticEvent} eventData
   *      Data about event.
   * @see #show
   */


  handleFocus(eventData) {
    const {
      showOnFocus
    } = this.props;

    if (showOnFocus === true || showOnFocus(eventData, this)) {
      eventData.preventDefault();
      eventData.stopPropagation();
      this.show();
    }
  }
  /**
   * Handle mouse move over component.
   *
   * @param {SyntheticEvent} eventData
   *      Data about event.
   * @see #show
   */


  handleMouseMove(eventData) {
    eventData.preventDefault();
    eventData.stopPropagation();
    this.show();
  }
  /**
   * Component's lifecycle method that is invoked to create component view.
   *
   * @return {ReactElement}
   *      Component view.
   */


  render() {
    const {
      props
    } = this;
    const {
      children,
      component: Component,
      componentRef,
      hideClassName,
      hideStyle,
      showClassName,
      showOnMouseOver,
      showStyle,
      toggleVisibleOnClick
    } = props;
    let {
      className
    } = props;
    const {
      visible
    } = this.state;
    const handleClick = toggleVisibleOnClick && this.handleClick || null;
    const handleMove = showOnMouseOver ? this.handleMouseMove : null;
    const classList = [];

    if (className) {
      classList.push(className);
    }

    className = visible ? showClassName : hideClassName;

    if (className) {
      classList.push(className);
    }

    return /*#__PURE__*/React.createElement(Component, Object.assign({}, props.componentProps, {
      ref: componentRef,
      className: classList.join(' '),
      style: visible ? showStyle : hideStyle,
      onClick: handleClick,
      onTouchEnd: handleClick,
      onMouseMove: handleMove,
      onTouchMove: handleMove,
      onMouseLeave: props.hideOnMouseLeave ? this.hide : null,
      onFocus: props.showOnFocus ? this.handleFocus : null,
      onBlur: props.hideOnBlur ? this.handleBlur : null
    }), children);
  }

}
/**
 * Id of timeout after which component will be hidden.
 *
 * @type {number}
 * @instance
 * @memberof TempShow
 */

TempShow.prototype.hideTimeoutId = null;
/**
 * Default function that is used to determine whether component should be hidden on a mouse click.
 *
 * Return `true` when component's root DOM element is clicked.
 *
 * @param {SyntheticEvent} eventData
 *      Data about event.
 * @return {boolean}
 *      `true` when component should be hidden.
 * @static
 * @memberof TempShow
 */

TempShow.hideForClick = function hideForClick(eventData) {
  return eventData.currentTarget === eventData.target;
};

TempShow.propTypes = {
  /**
   * Number of seconds after which component should be hidden automatically.
   * When zero or negative value is specified auto hiding is not applied.
   */
  autoHide: PropTypes.number,

  /**
   * Component's children.
   */
  children: PropTypes.node,

  /**
   * A CSS class that should be set for component's root element.
   */
  className: PropTypes.string,

  /**
   * Component's root element type.
   */
  component: PropTypes.elementType,

  /**
   * Any properties (except for `className` and `style`) that should be passed to component.
   */
  componentProps: PropTypes.object,

  /**
   * An optional ref callback to get reference to the root (top-most) element of the rendered component.
   * Just like other refs, this will provide `null` when it unmounts.
   *
   * This is helpful if you'd like access the DOM node for a parent Component without needing to use
   * `ReactDOM.findDOMNode`.
   */
  componentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * An additional CSS class that should be set for component's root element when component is hidden.
   */
  hideClassName: PropTypes.string,

  /**
   * Function that will be used to determine whether component should be hidden on a mouse click
   * when value of `hideOnAnyClick` prop is `false`.
   * The following arguments will be passed into function: event data (`SyntheticEvent`)
   * and component's object.
   * If the function returns a true value, component will be hidden.
   */
  hideForClick: PropTypes.func,

  /**
   * Whether component should be hidden on any mouse click.
   */
  hideOnAnyClick: PropTypes.bool,

  /**
   * Whether component should be hidden on `blur` event.
   * A function can be specified to determine whether component should be hidden.
   * The following arguments will be passed into function: event data (`SyntheticEvent`)
   * and component's object.
   * If the function returns a true value, component will be hidden.
   */
  hideOnBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /**
   * Whether component should be hidden when mouse leaves area of component's root DOM element.
   */
  hideOnMouseLeave: PropTypes.bool,

  /**
   * Styles that should be assigned for hidden component.
   */
  hideStyle: PropTypes.object,

  /**
   * Whether component's autohiding should be postponed when component props are changed.
   */
  postponeAutoHide: PropTypes.bool,

  /**
   * An additional CSS class that should be set for component's root element when component is visible.
   */
  showClassName: PropTypes.string,

  /**
   * Whether component should be shown on `focus` event.
   * A function can be specified to determine whether component should be shown.
   * The following arguments will be passed into function: event data (`SyntheticEvent`)
   * and component's object.
   * If the function returns a true value, component will be shown.
   */
  showOnFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /**
   * Should component be shown on mouse over?
   */
  showOnMouseOver: PropTypes.bool,

  /**
   * Styles that should be assigned for visible component.
   */
  showStyle: PropTypes.object,

  /**
   * Whether component visibility should be toggled on a mouse click.
   */
  toggleVisibleOnClick: PropTypes.bool,

  /**
   * Should component be visible?
   * Can be used to explicitly control component's visibility.
   */
  visible: PropTypes.bool,

  /**
   * Function that should be called on component hidding.
   * The following arguments will be passed into function: `false` and component's object.
   */
  onHide: PropTypes.func,

  /**
   * Function that should be called on component show.
   * The following arguments will be passed into function: `true` and component's object.
   */
  onShow: PropTypes.func
};
TempShow.defaultProps = {
  autoHide: 5,
  component: 'div',
  hideForClick: TempShow.hideForClick,
  hideOnAnyClick: false,
  hideOnBlur: false,
  postponeAutoHide: true,
  showOnFocus: true,
  showOnMouseOver: true,
  toggleVisibleOnClick: true,
  visible: false
};

export default TempShow;
//# sourceMappingURL=tempshow.modern.js.map
