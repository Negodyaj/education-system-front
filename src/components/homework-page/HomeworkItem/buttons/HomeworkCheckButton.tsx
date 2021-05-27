import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Homework } from '../../../../interfaces/Homework';
import { homeworkUrl } from '../../../../shared/consts';
import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkCheckButton(props: { hw: Homework }) {
  const { hw } = props;
  const history = useHistory();
  const checkOnClick = () => {
    history.push(`${homeworkUrl}/${hw.id}/attempt`);
  };

  return (
    <RoundButton title="проверить" onClick={checkOnClick}>
      <FontAwesomeIcon icon="spell-check" />
    </RoundButton>
  );
}
export default HomeworkCheckButton;
