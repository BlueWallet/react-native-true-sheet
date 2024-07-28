import React from 'react';
import { View } from 'react-native';
export * from '../TrueSheetGrabber';
export class TrueSheet extends React.Component {
  static dismiss = jest.fn();
  static present = jest.fn();
  static resize = jest.fn();
  dismiss = jest.fn();
  present = jest.fn();
  resize = jest.fn();
  render() {
    return /*#__PURE__*/React.createElement(View, this.props);
  }
}
//# sourceMappingURL=index.js.map