import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { Homework } from '../../../../../interfaces/Homework';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';

import HomeworkAppointModal from './HomeworkAppointModal';

interface Props {
  hw: Homework;
}

function HomeworkAppointButton(props: Props) {
  const { hw } = props;
  const [visibility, setVisibility] = useState(false);
  const appointOnClick = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <RoundButton title="назначить" onClick={appointOnClick}>
        <FontAwesomeIcon icon="calendar-check" />
      </RoundButton>
      <HomeworkAppointModal
        hw={hw}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </>
  );
}
export default HomeworkAppointButton;
