import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkCheckButton() {
  return (
    <RoundButton title="проверить">
      <FontAwesomeIcon icon="spell-check" />
    </RoundButton>
  );
}
export default HomeworkCheckButton;
