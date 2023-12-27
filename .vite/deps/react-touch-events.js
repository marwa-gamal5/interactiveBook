import {
  require_react
} from "./chunk-FQO5W7GE.js";
import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// node_modules/react-touch-events/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-touch-events/lib/index.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory(require_react());
      else if (typeof define === "function" && define.amd)
        define(["react"], factory);
      else if (typeof exports === "object")
        exports["ReactTouchEvents"] = factory(require_react());
      else
        root["ReactTouchEvents"] = factory(root["React"]);
    })(exports, function(__WEBPACK_EXTERNAL_MODULE_1__) {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
              return installedModules[moduleId].exports;
            var module2 = installedModules[moduleId] = {
              /******/
              exports: {},
              /******/
              id: moduleId,
              /******/
              loaded: false
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.loaded = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.p = "";
          return __webpack_require__(0);
        }([
          /* 0 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var _createClass = /* @__PURE__ */ function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
              if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var React = __webpack_require__(1);
            var PropTypes = __webpack_require__(2);
            function touchX(event) {
              if (event.type.indexOf("mouse") !== -1) {
                return event.clientX;
              }
              return event.touches[0].clientX;
            }
            function touchY(event) {
              if (event.type.indexOf("mouse") !== -1) {
                return event.clientY;
              }
              return event.touches[0].clientY;
            }
            var ReactTouchEvents = function(_React$Component) {
              _inherits(ReactTouchEvents2, _React$Component);
              function ReactTouchEvents2() {
                var _ref;
                var _temp, _this, _ret;
                _classCallCheck(this, ReactTouchEvents2);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactTouchEvents2.__proto__ || Object.getPrototypeOf(ReactTouchEvents2)).call.apply(_ref, [this].concat(args))), _this), _this.touchStarted = false, _this.touchMoved = false, _this.swipeOutBounded = false, _this.touchStartTime = 0, _this.lastTouchStartTime = 0, _this.lastTouchEndTime = 0, _this.startX = 0, _this.startY = 0, _this.currentX = 0, _this.currentY = 0, _this.el = null, _this.setElRef = function(element) {
                  _this.el = element;
                }, _this.touchStartEvent = function(event) {
                  var isTouchEvent = event.type.indexOf("touch") >= 0;
                  var isMouseEvent = event.type.indexOf("mouse") >= 0;
                  if (isTouchEvent) {
                    _this.lastTouchStartTime = event.timeStamp;
                  }
                  if (isMouseEvent && _this.lastTouchStartTime && event.timeStamp - _this.lastTouchStartTime < 350) {
                    return;
                  }
                  if (_this.touchStarted) {
                    return;
                  }
                  _this.addTouchClass();
                  _this.touchStarted = true;
                  _this.touchMoved = false;
                  _this.swipeOutBounded = false;
                  _this.startX = touchX(event);
                  _this.startY = touchY(event);
                  _this.currentX = _this.currentY = 0;
                  _this.touchStartTime = event.timeStamp;
                }, _this.touchMoveEvent = function(event) {
                  _this.currentX = touchX(event);
                  _this.currentY = touchY(event);
                  if (!_this.touchMoved) {
                    var tapTolerance = _this.props.tapTolerance;
                    _this.touchMoved = Math.abs(_this.startX - _this.currentX) > tapTolerance || Math.abs(_this.startY - _this.currentY) > tapTolerance;
                  } else if (!_this.swipeOutBounded) {
                    var swipeOutBounded = _this.props.swipeTolerance;
                    _this.swipeOutBounded = Math.abs(_this.startX - _this.currentX) > swipeOutBounded && Math.abs(_this.startY - _this.currentY) > swipeOutBounded;
                  }
                }, _this.touchCancelEvent = function() {
                  _this.removeTouchClass();
                  _this.touchStarted = _this.touchMoved = false;
                  _this.startX = _this.startY = 0;
                }, _this.touchEndEvent = function(event) {
                  var isTouchEvent = event.type.indexOf("touch") >= 0;
                  var isMouseEvent = event.type.indexOf("mouse") >= 0;
                  if (isTouchEvent) {
                    _this.lastTouchEndTime = event.timeStamp;
                  }
                  _this.touchStarted = false;
                  _this.removeTouchClass();
                  if (isMouseEvent && _this.lastTouchEndTime && event.timeStamp - _this.lastTouchEndTime < 350) {
                    return;
                  }
                  if (!_this.touchMoved) {
                    _this.triggerEvent(event, "tap");
                  } else if (!_this.swipeOutBounded) {
                    var swipeOutBounded = _this.props.swipeTolerance;
                    var direction = void 0;
                    if (Math.abs(_this.startX - _this.currentX) < swipeOutBounded) {
                      direction = _this.startY > _this.currentY ? "top" : "bottom";
                    } else {
                      direction = _this.startX > _this.currentX ? "left" : "right";
                    }
                    _this.triggerEvent(event, "swipe", direction);
                  }
                }, _this.mouseEnterEvent = function() {
                  _this.addTouchClass();
                }, _this.mouseLeaveEvent = function() {
                  _this.removeTouchClass();
                }, _this.triggerEvent = function(event, eventType, param) {
                  switch (eventType) {
                    case "tap":
                      _this.props.onTap && typeof _this.props.onTap === "function" && _this.props.onTap(event);
                      break;
                    case "swipe":
                      _this.props.onSwipe && typeof _this.props.onSwipe === "function" && _this.props.onSwipe(event, param);
                  }
                }, _this.addTouchClass = function() {
                  if (_this.el) {
                    var className = _this.props.touchClass;
                    className && _this.el.classList.add(className);
                  }
                }, _this.removeTouchClass = function() {
                  if (_this.el) {
                    var className = _this.props.touchClass;
                    className && _this.el.classList.remove(className);
                  }
                }, _temp), _possibleConstructorReturn(_this, _ret);
              }
              _createClass(ReactTouchEvents2, [{
                key: "render",
                value: function render() {
                  var children = this.props.children;
                  var element = children ? React.Children.only(children) : React.createElement("button", null);
                  var props = {
                    ref: this.setElRef,
                    onTouchStart: this.touchStartEvent,
                    onTouchMove: this.touchMoveEvent,
                    onTouchCancel: this.touchCancelEvent,
                    onTouchEnd: this.touchEndEvent
                  };
                  if (!this.props.disableClick) {
                    props.onMouseDown = this.touchStartEvent;
                    props.onMouseMove = this.touchMoveEvent;
                    props.onMouseUp = this.touchEndEvent;
                    props.onMouseEnter = this.mouseEnterEvent;
                    props.onMouseLeave = this.mouseLeaveEvent;
                  }
                  return React.cloneElement(element, props);
                }
              }]);
              return ReactTouchEvents2;
            }(React.Component);
            ReactTouchEvents.defaultProps = {
              disableClick: false,
              tapTolerance: 10,
              swipeTolerance: 30,
              touchClass: ""
            };
            ReactTouchEvents.propTypes = {
              children: PropTypes.node,
              tapTolerance: PropTypes.number,
              swipeTolerance: PropTypes.number,
              onTap: PropTypes.func,
              onSwipe: PropTypes.func
            };
            module2.exports = ReactTouchEvents;
          },
          /* 1 */
          /***/
          function(module2, exports2) {
            module2.exports = __WEBPACK_EXTERNAL_MODULE_1__;
          },
          /* 2 */
          /***/
          function(module2, exports2, __webpack_require__) {
            if (true) {
              var ReactIs = __webpack_require__(3);
              var throwOnDirectAccess = true;
              module2.exports = __webpack_require__(5)(ReactIs.isElement, throwOnDirectAccess);
            } else {
              module2.exports = null();
            }
          },
          /* 3 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            if (false) {
              module2.exports = null;
            } else {
              module2.exports = __webpack_require__(4);
            }
          },
          /* 4 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            if (true) {
              (function() {
                "use strict";
                var hasSymbol = typeof Symbol === "function" && Symbol.for;
                var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
                var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
                var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
                var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
                var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
                var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
                var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
                var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
                var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
                var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
                var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
                var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
                var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
                var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
                var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
                var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
                var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
                var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
                function isValidElementType(type) {
                  return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
                }
                function typeOf(object) {
                  if (typeof object === "object" && object !== null) {
                    var $$typeof = object.$$typeof;
                    switch ($$typeof) {
                      case REACT_ELEMENT_TYPE:
                        var type = object.type;
                        switch (type) {
                          case REACT_ASYNC_MODE_TYPE:
                          case REACT_CONCURRENT_MODE_TYPE:
                          case REACT_FRAGMENT_TYPE:
                          case REACT_PROFILER_TYPE:
                          case REACT_STRICT_MODE_TYPE:
                          case REACT_SUSPENSE_TYPE:
                            return type;
                          default:
                            var $$typeofType = type && type.$$typeof;
                            switch ($$typeofType) {
                              case REACT_CONTEXT_TYPE:
                              case REACT_FORWARD_REF_TYPE:
                              case REACT_LAZY_TYPE:
                              case REACT_MEMO_TYPE:
                              case REACT_PROVIDER_TYPE:
                                return $$typeofType;
                              default:
                                return $$typeof;
                            }
                        }
                      case REACT_PORTAL_TYPE:
                        return $$typeof;
                    }
                  }
                  return void 0;
                }
                var AsyncMode = REACT_ASYNC_MODE_TYPE;
                var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
                var ContextConsumer = REACT_CONTEXT_TYPE;
                var ContextProvider = REACT_PROVIDER_TYPE;
                var Element = REACT_ELEMENT_TYPE;
                var ForwardRef = REACT_FORWARD_REF_TYPE;
                var Fragment = REACT_FRAGMENT_TYPE;
                var Lazy = REACT_LAZY_TYPE;
                var Memo = REACT_MEMO_TYPE;
                var Portal = REACT_PORTAL_TYPE;
                var Profiler = REACT_PROFILER_TYPE;
                var StrictMode = REACT_STRICT_MODE_TYPE;
                var Suspense = REACT_SUSPENSE_TYPE;
                var hasWarnedAboutDeprecatedIsAsyncMode = false;
                function isAsyncMode(object) {
                  {
                    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                      hasWarnedAboutDeprecatedIsAsyncMode = true;
                      console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
                    }
                  }
                  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
                }
                function isConcurrentMode(object) {
                  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
                }
                function isContextConsumer(object) {
                  return typeOf(object) === REACT_CONTEXT_TYPE;
                }
                function isContextProvider(object) {
                  return typeOf(object) === REACT_PROVIDER_TYPE;
                }
                function isElement(object) {
                  return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
                }
                function isForwardRef(object) {
                  return typeOf(object) === REACT_FORWARD_REF_TYPE;
                }
                function isFragment(object) {
                  return typeOf(object) === REACT_FRAGMENT_TYPE;
                }
                function isLazy(object) {
                  return typeOf(object) === REACT_LAZY_TYPE;
                }
                function isMemo(object) {
                  return typeOf(object) === REACT_MEMO_TYPE;
                }
                function isPortal(object) {
                  return typeOf(object) === REACT_PORTAL_TYPE;
                }
                function isProfiler(object) {
                  return typeOf(object) === REACT_PROFILER_TYPE;
                }
                function isStrictMode(object) {
                  return typeOf(object) === REACT_STRICT_MODE_TYPE;
                }
                function isSuspense(object) {
                  return typeOf(object) === REACT_SUSPENSE_TYPE;
                }
                exports2.AsyncMode = AsyncMode;
                exports2.ConcurrentMode = ConcurrentMode;
                exports2.ContextConsumer = ContextConsumer;
                exports2.ContextProvider = ContextProvider;
                exports2.Element = Element;
                exports2.ForwardRef = ForwardRef;
                exports2.Fragment = Fragment;
                exports2.Lazy = Lazy;
                exports2.Memo = Memo;
                exports2.Portal = Portal;
                exports2.Profiler = Profiler;
                exports2.StrictMode = StrictMode;
                exports2.Suspense = Suspense;
                exports2.isAsyncMode = isAsyncMode;
                exports2.isConcurrentMode = isConcurrentMode;
                exports2.isContextConsumer = isContextConsumer;
                exports2.isContextProvider = isContextProvider;
                exports2.isElement = isElement;
                exports2.isForwardRef = isForwardRef;
                exports2.isFragment = isFragment;
                exports2.isLazy = isLazy;
                exports2.isMemo = isMemo;
                exports2.isPortal = isPortal;
                exports2.isProfiler = isProfiler;
                exports2.isStrictMode = isStrictMode;
                exports2.isSuspense = isSuspense;
                exports2.isValidElementType = isValidElementType;
                exports2.typeOf = typeOf;
              })();
            }
          },
          /* 5 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var ReactIs = __webpack_require__(3);
            var assign = __webpack_require__(6);
            var ReactPropTypesSecret = __webpack_require__(7);
            var checkPropTypes = __webpack_require__(8);
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            var printWarning = function() {
            };
            if (true) {
              printWarning = function(text) {
                var message = "Warning: " + text;
                if (typeof console !== "undefined") {
                  console.error(message);
                }
                try {
                  throw new Error(message);
                } catch (x) {
                }
              };
            }
            function emptyFunctionThatReturnsNull() {
              return null;
            }
            module2.exports = function(isValidElement, throwOnDirectAccess) {
              var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
              var FAUX_ITERATOR_SYMBOL = "@@iterator";
              function getIteratorFn(maybeIterable) {
                var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
                if (typeof iteratorFn === "function") {
                  return iteratorFn;
                }
              }
              var ANONYMOUS = "<<anonymous>>";
              var ReactPropTypes = {
                array: createPrimitiveTypeChecker("array"),
                bool: createPrimitiveTypeChecker("boolean"),
                func: createPrimitiveTypeChecker("function"),
                number: createPrimitiveTypeChecker("number"),
                object: createPrimitiveTypeChecker("object"),
                string: createPrimitiveTypeChecker("string"),
                symbol: createPrimitiveTypeChecker("symbol"),
                any: createAnyTypeChecker(),
                arrayOf: createArrayOfTypeChecker,
                element: createElementTypeChecker(),
                elementType: createElementTypeTypeChecker(),
                instanceOf: createInstanceTypeChecker,
                node: createNodeChecker(),
                objectOf: createObjectOfTypeChecker,
                oneOf: createEnumTypeChecker,
                oneOfType: createUnionTypeChecker,
                shape: createShapeTypeChecker,
                exact: createStrictShapeTypeChecker
              };
              function is(x, y) {
                if (x === y) {
                  return x !== 0 || 1 / x === 1 / y;
                } else {
                  return x !== x && y !== y;
                }
              }
              function PropTypeError(message) {
                this.message = message;
                this.stack = "";
              }
              PropTypeError.prototype = Error.prototype;
              function createChainableTypeChecker(validate) {
                if (true) {
                  var manualPropTypeCallCache = {};
                  var manualPropTypeWarningCount = 0;
                }
                function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                  componentName = componentName || ANONYMOUS;
                  propFullName = propFullName || propName;
                  if (secret !== ReactPropTypesSecret) {
                    if (throwOnDirectAccess) {
                      var err = new Error(
                        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
                      );
                      err.name = "Invariant Violation";
                      throw err;
                    } else if (typeof console !== "undefined") {
                      var cacheKey = componentName + ":" + propName;
                      if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                      manualPropTypeWarningCount < 3) {
                        printWarning(
                          "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                        );
                        manualPropTypeCallCache[cacheKey] = true;
                        manualPropTypeWarningCount++;
                      }
                    }
                  }
                  if (props[propName] == null) {
                    if (isRequired) {
                      if (props[propName] === null) {
                        return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                      }
                      return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
                    }
                    return null;
                  } else {
                    return validate(props, propName, componentName, location, propFullName);
                  }
                }
                var chainedCheckType = checkType.bind(null, false);
                chainedCheckType.isRequired = checkType.bind(null, true);
                return chainedCheckType;
              }
              function createPrimitiveTypeChecker(expectedType) {
                function validate(props, propName, componentName, location, propFullName, secret) {
                  var propValue = props[propName];
                  var propType = getPropType(propValue);
                  if (propType !== expectedType) {
                    var preciseType = getPreciseType(propValue);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createAnyTypeChecker() {
                return createChainableTypeChecker(emptyFunctionThatReturnsNull);
              }
              function createArrayOfTypeChecker(typeChecker) {
                function validate(props, propName, componentName, location, propFullName) {
                  if (typeof typeChecker !== "function") {
                    return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
                  }
                  var propValue = props[propName];
                  if (!Array.isArray(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
                  }
                  for (var i = 0; i < propValue.length; i++) {
                    var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                    if (error instanceof Error) {
                      return error;
                    }
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createElementTypeChecker() {
                function validate(props, propName, componentName, location, propFullName) {
                  var propValue = props[propName];
                  if (!isValidElement(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createElementTypeTypeChecker() {
                function validate(props, propName, componentName, location, propFullName) {
                  var propValue = props[propName];
                  if (!ReactIs.isValidElementType(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createInstanceTypeChecker(expectedClass) {
                function validate(props, propName, componentName, location, propFullName) {
                  if (!(props[propName] instanceof expectedClass)) {
                    var expectedClassName = expectedClass.name || ANONYMOUS;
                    var actualClassName = getClassName(props[propName]);
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createEnumTypeChecker(expectedValues) {
                if (!Array.isArray(expectedValues)) {
                  if (true) {
                    if (arguments.length > 1) {
                      printWarning(
                        "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                      );
                    } else {
                      printWarning("Invalid argument supplied to oneOf, expected an array.");
                    }
                  }
                  return emptyFunctionThatReturnsNull;
                }
                function validate(props, propName, componentName, location, propFullName) {
                  var propValue = props[propName];
                  for (var i = 0; i < expectedValues.length; i++) {
                    if (is(propValue, expectedValues[i])) {
                      return null;
                    }
                  }
                  var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                    var type = getPreciseType(value);
                    if (type === "symbol") {
                      return String(value);
                    }
                    return value;
                  });
                  return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
                }
                return createChainableTypeChecker(validate);
              }
              function createObjectOfTypeChecker(typeChecker) {
                function validate(props, propName, componentName, location, propFullName) {
                  if (typeof typeChecker !== "function") {
                    return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
                  }
                  var propValue = props[propName];
                  var propType = getPropType(propValue);
                  if (propType !== "object") {
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
                  }
                  for (var key in propValue) {
                    if (has(propValue, key)) {
                      var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                      if (error instanceof Error) {
                        return error;
                      }
                    }
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createUnionTypeChecker(arrayOfTypeCheckers) {
                if (!Array.isArray(arrayOfTypeCheckers)) {
                  true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
                  return emptyFunctionThatReturnsNull;
                }
                for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                  var checker = arrayOfTypeCheckers[i];
                  if (typeof checker !== "function") {
                    printWarning(
                      "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
                    );
                    return emptyFunctionThatReturnsNull;
                  }
                }
                function validate(props, propName, componentName, location, propFullName) {
                  for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
                    var checker2 = arrayOfTypeCheckers[i2];
                    if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
                      return null;
                    }
                  }
                  return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
                }
                return createChainableTypeChecker(validate);
              }
              function createNodeChecker() {
                function validate(props, propName, componentName, location, propFullName) {
                  if (!isNode(props[propName])) {
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createShapeTypeChecker(shapeTypes) {
                function validate(props, propName, componentName, location, propFullName) {
                  var propValue = props[propName];
                  var propType = getPropType(propValue);
                  if (propType !== "object") {
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
                  }
                  for (var key in shapeTypes) {
                    var checker = shapeTypes[key];
                    if (!checker) {
                      continue;
                    }
                    var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                    if (error) {
                      return error;
                    }
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function createStrictShapeTypeChecker(shapeTypes) {
                function validate(props, propName, componentName, location, propFullName) {
                  var propValue = props[propName];
                  var propType = getPropType(propValue);
                  if (propType !== "object") {
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
                  }
                  var allKeys = assign({}, props[propName], shapeTypes);
                  for (var key in allKeys) {
                    var checker = shapeTypes[key];
                    if (!checker) {
                      return new PropTypeError(
                        "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
                      );
                    }
                    var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                    if (error) {
                      return error;
                    }
                  }
                  return null;
                }
                return createChainableTypeChecker(validate);
              }
              function isNode(propValue) {
                switch (typeof propValue) {
                  case "number":
                  case "string":
                  case "undefined":
                    return true;
                  case "boolean":
                    return !propValue;
                  case "object":
                    if (Array.isArray(propValue)) {
                      return propValue.every(isNode);
                    }
                    if (propValue === null || isValidElement(propValue)) {
                      return true;
                    }
                    var iteratorFn = getIteratorFn(propValue);
                    if (iteratorFn) {
                      var iterator = iteratorFn.call(propValue);
                      var step;
                      if (iteratorFn !== propValue.entries) {
                        while (!(step = iterator.next()).done) {
                          if (!isNode(step.value)) {
                            return false;
                          }
                        }
                      } else {
                        while (!(step = iterator.next()).done) {
                          var entry = step.value;
                          if (entry) {
                            if (!isNode(entry[1])) {
                              return false;
                            }
                          }
                        }
                      }
                    } else {
                      return false;
                    }
                    return true;
                  default:
                    return false;
                }
              }
              function isSymbol(propType, propValue) {
                if (propType === "symbol") {
                  return true;
                }
                if (!propValue) {
                  return false;
                }
                if (propValue["@@toStringTag"] === "Symbol") {
                  return true;
                }
                if (typeof Symbol === "function" && propValue instanceof Symbol) {
                  return true;
                }
                return false;
              }
              function getPropType(propValue) {
                var propType = typeof propValue;
                if (Array.isArray(propValue)) {
                  return "array";
                }
                if (propValue instanceof RegExp) {
                  return "object";
                }
                if (isSymbol(propType, propValue)) {
                  return "symbol";
                }
                return propType;
              }
              function getPreciseType(propValue) {
                if (typeof propValue === "undefined" || propValue === null) {
                  return "" + propValue;
                }
                var propType = getPropType(propValue);
                if (propType === "object") {
                  if (propValue instanceof Date) {
                    return "date";
                  } else if (propValue instanceof RegExp) {
                    return "regexp";
                  }
                }
                return propType;
              }
              function getPostfixForTypeWarning(value) {
                var type = getPreciseType(value);
                switch (type) {
                  case "array":
                  case "object":
                    return "an " + type;
                  case "boolean":
                  case "date":
                  case "regexp":
                    return "a " + type;
                  default:
                    return type;
                }
              }
              function getClassName(propValue) {
                if (!propValue.constructor || !propValue.constructor.name) {
                  return ANONYMOUS;
                }
                return propValue.constructor.name;
              }
              ReactPropTypes.checkPropTypes = checkPropTypes;
              ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
              ReactPropTypes.PropTypes = ReactPropTypes;
              return ReactPropTypes;
            };
          },
          /* 6 */
          /***/
          function(module2, exports2) {
            "use strict";
            var getOwnPropertySymbols = Object.getOwnPropertySymbols;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var propIsEnumerable = Object.prototype.propertyIsEnumerable;
            function toObject(val) {
              if (val === null || val === void 0) {
                throw new TypeError("Object.assign cannot be called with null or undefined");
              }
              return Object(val);
            }
            function shouldUseNative() {
              try {
                if (!Object.assign) {
                  return false;
                }
                var test1 = new String("abc");
                test1[5] = "de";
                if (Object.getOwnPropertyNames(test1)[0] === "5") {
                  return false;
                }
                var test2 = {};
                for (var i = 0; i < 10; i++) {
                  test2["_" + String.fromCharCode(i)] = i;
                }
                var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                  return test2[n];
                });
                if (order2.join("") !== "0123456789") {
                  return false;
                }
                var test3 = {};
                "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                  test3[letter] = letter;
                });
                if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                  return false;
                }
                return true;
              } catch (err) {
                return false;
              }
            }
            module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
              var from;
              var to = toObject(target);
              var symbols;
              for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);
                for (var key in from) {
                  if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                  }
                }
                if (getOwnPropertySymbols) {
                  symbols = getOwnPropertySymbols(from);
                  for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                      to[symbols[i]] = from[symbols[i]];
                    }
                  }
                }
              }
              return to;
            };
          },
          /* 7 */
          /***/
          function(module2, exports2) {
            "use strict";
            var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
            module2.exports = ReactPropTypesSecret;
          },
          /* 8 */
          /***/
          function(module2, exports2, __webpack_require__) {
            "use strict";
            var printWarning = function() {
            };
            if (true) {
              var ReactPropTypesSecret = __webpack_require__(7);
              var loggedTypeFailures = {};
              var has = Function.call.bind(Object.prototype.hasOwnProperty);
              printWarning = function(text) {
                var message = "Warning: " + text;
                if (typeof console !== "undefined") {
                  console.error(message);
                }
                try {
                  throw new Error(message);
                } catch (x) {
                }
              };
            }
            function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
              if (true) {
                for (var typeSpecName in typeSpecs) {
                  if (has(typeSpecs, typeSpecName)) {
                    var error;
                    try {
                      if (typeof typeSpecs[typeSpecName] !== "function") {
                        var err = Error(
                          (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`."
                        );
                        err.name = "Invariant Violation";
                        throw err;
                      }
                      error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                    } catch (ex) {
                      error = ex;
                    }
                    if (error && !(error instanceof Error)) {
                      printWarning(
                        (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
                      );
                    }
                    if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                      loggedTypeFailures[error.message] = true;
                      var stack = getStack ? getStack() : "";
                      printWarning(
                        "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
                      );
                    }
                  }
                }
              }
            }
            checkPropTypes.resetWarningCache = function() {
              if (true) {
                loggedTypeFailures = {};
              }
            };
            module2.exports = checkPropTypes;
          }
          /******/
        ])
      );
    });
  }
});
export default require_lib();
/*! Bundled license information:

react-touch-events/lib/index.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=react-touch-events.js.map
