import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';
import { appointHomework } from '../../../../store/homework-page/action-creators';

function HomeworkEditButton() {
  const dispatch = useDispatch();

  return (
    <RoundButton title="редактировать">
      <FontAwesomeIcon icon="edit" />
    </RoundButton>
  );
}
export default HomeworkEditButton;
