(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('prop-types'), require('react')) :
  typeof define === 'function' && define.amd ? define(['prop-types', 'react'], factory) :
  (global.tempshow = factory(global.PropTypes,global.react));
}(this, (function (PropTypes,React) {
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  var React__default = 'default' in React ? React['default'] : React;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /**
   * Class of component to temporary show some elements.
   *
   * @extends {PureComponent}
   */

  var TempShow =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(TempShow, _PureComponent);

    /**
     * Component constructor.
     *
     * @param {object} props
     *      Initial props values.
     */
    function TempShow(props) {
      var _this;

      _classCallCheck(this, TempShow);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TempShow).call(this, props));
      _this.state = {
        visible: props.visible
      };
      _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
      _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
      _this.hide = _this.hide.bind(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * Component's lifecycle method that is invoked immediately after updating occurs.
     *
     * @param {object} prevProps
     *      Previous props values.
     * @param {object} prevState
     *      Previous state.
     */


    _createClass(TempShow, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var props = this.props,
            state = this.state;

        if (state.visible === prevState.visible) {
          var visible = props.visible;

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

    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.hide();
      }
      /**
       * Cancel component's early scheduled hiding.
       *
       * @return {TempShow}
       *      Reference to component's object (`this`).
       */

    }, {
      key: "cancelHide",
      value: function cancelHide() {
        var timeoutId = this.hideTimeoutId;

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

    }, {
      key: "hide",
      value: function hide() {
        if (this.state.visible) {
          var onHide = this.props.onHide;
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

    }, {
      key: "show",
      value: function show(autoHideTime) {
        var props = this.props;
        var autoHide = typeof autoHideTime === 'number' ? autoHideTime : props.autoHide;
        this.cancelHide();

        if (autoHide > 0) {
          // eslint-disable-next-line no-magic-numbers
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

    }, {
      key: "toggleVisible",
      value: function toggleVisible() {
        if (this.state.visible) {
          this.hide();
        } else {
          this.show();
        }
      }
      /**
       * Handle mouse click on component.
       *
       * @param {SyntheticEvent} eventData
       *      Data about event.
       * @see #toggleVisible
       */

    }, {
      key: "handleClick",
      value: function handleClick(eventData) {
        var props = this.props;

        if (!this.state.visible || props.hideOnAnyClick || props.hideForClick(eventData, this)) {
          eventData.preventDefault();
          eventData.stopPropagation();
          this.toggleVisible();
        }
      }
      /**
       * Handle mouse move over component.
       *
       * @param {SyntheticEvent} eventData
       *      Data about event.
       * @see #show
       */

    }, {
      key: "handleMouseMove",
      value: function handleMouseMove(eventData) {
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

    }, {
      key: "render",
      value: function render() {
        var props = this.props;
        var children = props.children,
            Component = props.component,
            componentRef = props.componentRef,
            hideClassName = props.hideClassName,
            hideStyle = props.hideStyle,
            showClassName = props.showClassName,
            showOnMouseOver = props.showOnMouseOver,
            showStyle = props.showStyle,
            toggleVisibleOnClick = props.toggleVisibleOnClick;
        var className = props.className;
        var visible = this.state.visible;
        var handleClick = toggleVisibleOnClick && this.handleClick || null;
        var handleMove = showOnMouseOver ? this.handleMouseMove : null;
        var classList = [];

        if (className) {
          classList.push(className);
        }

        className = visible ? showClassName : hideClassName;

        if (className) {
          classList.push(className);
        }

        return React__default.createElement(Component, {
          ref: componentRef,
          className: classList.join(' '),
          style: visible ? showStyle : hideStyle,
          onClick: handleClick,
          onTouchEnd: handleClick,
          onMouseMove: handleMove,
          onTouchMove: handleMove,
          onMouseLeave: props.hideOnMouseLeave ? this.hide : null
        }, children);
      }
    }]);

    return TempShow;
  }(React.PureComponent);
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
     * If function returns `true`, component will be hidden.
     */
    hideForClick: PropTypes.func,

    /**
     * Whether component should be hidden on any mouse click.
     */
    hideOnAnyClick: PropTypes.bool,

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
     */
    onHide: PropTypes.func,

    /**
     * Function that should be called on component show.
     */
    onShow: PropTypes.func
  };
  TempShow.defaultProps = {
    autoHide: 5,
    component: 'div',
    hideForClick: TempShow.hideForClick,
    hideOnAnyClick: false,
    postponeAutoHide: true,
    showOnMouseOver: true,
    toggleVisibleOnClick: true,
    visible: false
  };

  return TempShow;

})));
//# sourceMappingURL=tempshow.umd.js.map
