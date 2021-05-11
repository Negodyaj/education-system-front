import React from 'react';

import CustomListItemBody from './CustomListItemBody';
import CustomListItemHeader from './CustomListItemHeader';

function CustomListItem() {
  return (
    <li className="custom-list-item">
      <CustomListItemHeader />
      <CustomListItemBody />
    </li>
  );
}

export default CustomListItem;
