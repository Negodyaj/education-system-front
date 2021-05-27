import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkEditAttemptButton() {
  const dispatch = useDispatch();

  return (
    <RoundButton title="редактировать">
      <FontAwesomeIcon icon="edit" />
    </RoundButton>
  );
}
export default HomeworkEditAttemptButton;
