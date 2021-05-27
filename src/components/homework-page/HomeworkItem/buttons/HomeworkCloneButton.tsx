import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkConeButton() {
  const dispatch = useDispatch();

  return (
    <RoundButton title="клонировать">
      <FontAwesomeIcon icon="clone" />
    </RoundButton>
  );
}
export default HomeworkConeButton;
