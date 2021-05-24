import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Homework } from '../../../../interfaces/Homework';
import { homeworkUrl } from '../../../../shared/consts';
import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkAttemptButton(props: { hw: Homework }) {
  const { hw } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const attemptOnClick = () => {
    history.push(`${homeworkUrl}/${hw.id}/attempt-creator`);
  };

  return (
    <RoundButton title="выполнить" onClick={attemptOnClick}>
      <FontAwesomeIcon icon="graduation-cap" />
    </RoundButton>
  );
}
export default HomeworkAttemptButton;
