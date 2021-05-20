import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';

import HomeworkAppointModal from './HomeworkAppointModal';

function HomeworkAppointButton() {
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
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </>
  );
}
export default HomeworkAppointButton;
