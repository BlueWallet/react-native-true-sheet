"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrueSheetFooter = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TrueSheetFooter = props => {
  const {
    Component
  } = props;
  if (!Component) return null;
  if (typeof Component !== 'function') {
    return Component;
  }
  return /*#__PURE__*/_react.default.createElement(Component, null);
};
exports.TrueSheetFooter = TrueSheetFooter;
//# sourceMappingURL=TrueSheetFooter.js.map