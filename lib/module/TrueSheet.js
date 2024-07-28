function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { PureComponent, createRef } from 'react';
import { requireNativeComponent, Platform, findNodeHandle, View } from 'react-native';
import { TrueSheetModule } from './TrueSheetModule';
import { TrueSheetGrabber } from './TrueSheetGrabber';
import { TrueSheetFooter } from './TrueSheetFooter';
const NATIVE_COMPONENT_NAME = 'TrueSheetView';
const LINKING_ERROR = `The package '@lodev09/react-native-true-sheet' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const TrueSheetNativeView = requireNativeComponent(NATIVE_COMPONENT_NAME);
if (!TrueSheetNativeView) {
  throw new Error(LINKING_ERROR);
}
export class TrueSheet extends PureComponent {
  displayName = 'TrueSheet';
  /**
   * Map of sheet names against their handle.
   */
  static handles = {};
  constructor(props) {
    super(props);
    this.ref = /*#__PURE__*/createRef();
    this.onMount = this.onMount.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onPresent = this.onPresent.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onContentLayout = this.onContentLayout.bind(this);
    this.onFooterLayout = this.onFooterLayout.bind(this);
    this.state = {
      contentHeight: undefined,
      footerHeight: undefined,
      scrollableHandle: null
    };
  }
  static getHandle(name) {
    const handle = TrueSheet.handles[name];
    if (!handle) {
      console.warn(`Could not get native view tag from "${name}". Check your name prop.`);
      return;
    }
    return handle;
  }

  /**
   * Present the sheet by given `name`.
   * See `name` prop.
   */
  static async present(name, index = 0) {
    const handle = TrueSheet.getHandle(name);
    if (!handle) return;
    await TrueSheetModule.present(handle, index);
  }

  /**
   * Dismiss the sheet by given `name`.
   * See `name` prop.
   */
  static async dismiss(name) {
    const handle = TrueSheet.getHandle(name);
    if (!handle) return;
    await TrueSheetModule.dismiss(handle);
  }

  /**
   * Resize the sheet by given `name`.
   * See `name` prop.
   */
  static async resize(name, index) {
    await TrueSheet.present(name, index);
  }
  get handle() {
    const nodeHandle = findNodeHandle(this.ref.current);
    if (nodeHandle == null || nodeHandle === -1) {
      throw new Error('Could not get native view tag');
    }
    return nodeHandle;
  }
  updateState() {
    const scrollableHandle = this.props.scrollRef?.current ? findNodeHandle(this.props.scrollRef.current) : null;
    if (this.props.name) {
      TrueSheet.handles[this.props.name] = this.handle;
    }
    this.setState({
      scrollableHandle
    });
  }
  onSizeChange(event) {
    this.props.onSizeChange?.(event.nativeEvent);
  }
  onPresent(event) {
    this.props.onPresent?.(event.nativeEvent);
  }
  onFooterLayout(event) {
    this.setState({
      footerHeight: event.nativeEvent.layout.height
    });
  }
  onContentLayout(event) {
    this.setState({
      contentHeight: event.nativeEvent.layout.height
    });
  }
  onDismiss() {
    this.props.onDismiss?.();
  }
  onMount() {
    this.props.onMount?.();
  }

  /**
   * Present the sheet. Optionally accepts a size `index`.
   * See `sizes` prop
   */
  async present(index = 0) {
    await TrueSheetModule.present(this.handle, index);
  }

  /**
   * Resizes the Sheet programmatically by `index`.
   * This is an alias of the `present(index)` method.
   */
  async resize(index) {
    await this.present(index);
  }

  /**
   * Dismisses the Sheet
   */
  async dismiss() {
    await TrueSheetModule.dismiss(this.handle);
  }
  componentDidMount() {
    if (this.props.sizes && this.props.sizes.length > 3) {
      console.warn('TrueSheet only supports a maximum of 3 sizes; collapsed, half-expanded and expanded. Check your `sizes` prop.');
    }
    this.updateState();
  }
  componentDidUpdate() {
    this.updateState();
  }
  render() {
    const {
      sizes = ['medium', 'large'],
      backgroundColor = 'white',
      dismissible = true,
      grabber = true,
      dimmed = true,
      initialIndexAnimated = true,
      keyboardMode = 'resize',
      initialIndex,
      dimmedIndex,
      grabberProps,
      blurTint,
      cornerRadius,
      maxHeight,
      FooterComponent,
      style,
      contentContainerStyle,
      children,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(TrueSheetNativeView, {
      ref: this.ref,
      style: $nativeSheet,
      scrollableHandle: this.state.scrollableHandle,
      sizes: sizes,
      blurTint: blurTint,
      cornerRadius: cornerRadius,
      contentHeight: this.state.contentHeight,
      footerHeight: this.state.footerHeight,
      grabber: grabber,
      dimmed: dimmed,
      dimmedIndex: dimmedIndex,
      initialIndex: initialIndex,
      initialIndexAnimated: initialIndexAnimated,
      keyboardMode: keyboardMode,
      dismissible: dismissible,
      maxHeight: maxHeight,
      onMount: this.onMount,
      onPresent: this.onPresent,
      onDismiss: this.onDismiss,
      onSizeChange: this.onSizeChange
    }, /*#__PURE__*/React.createElement(View, _extends({
      collapsable: false,
      style: [{
        overflow: Platform.select({
          ios: undefined,
          android: 'hidden'
        }),
        borderTopLeftRadius: cornerRadius,
        borderTopRightRadius: cornerRadius,
        // Remove backgroundColor if `blurTint` is set on iOS
        backgroundColor: Platform.select({
          ios: blurTint ? undefined : backgroundColor,
          android: backgroundColor
        })
      }, style]
    }, rest), /*#__PURE__*/React.createElement(View, {
      collapsable: false,
      onLayout: this.onContentLayout,
      style: contentContainerStyle
    }, children), /*#__PURE__*/React.createElement(View, {
      collapsable: false,
      onLayout: this.onFooterLayout
    }, /*#__PURE__*/React.createElement(TrueSheetFooter, {
      Component: FooterComponent
    })), Platform.OS === 'android' && /*#__PURE__*/React.createElement(TrueSheetGrabber, _extends({
      visible: grabber
    }, grabberProps))));
  }
}
const $nativeSheet = {
  position: 'absolute',
  width: '100%',
  left: -9999,
  zIndex: -9999
};
//# sourceMappingURL=TrueSheet.js.map