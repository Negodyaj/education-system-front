import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkConeButton() {
  return (
    <RoundButton title="клонировать">
      <FontAwesomeIcon icon="clone" />
    </RoundButton>
  );
}
export default HomeworkConeButton;
