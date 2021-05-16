import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkAttemptButton() {
  return (
    <RoundButton title="выполнить">
      <FontAwesomeIcon icon="graduation-cap" />
    </RoundButton>
  );
}
export default HomeworkAttemptButton;
