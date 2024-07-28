import React from 'react';
export const TrueSheetFooter = props => {
  const {
    Component
  } = props;
  if (!Component) return null;
  if (typeof Component !== 'function') {
    return Component;
  }
  return /*#__PURE__*/React.createElement(Component, null);
};
//# sourceMappingURL=TrueSheetFooter.js.map