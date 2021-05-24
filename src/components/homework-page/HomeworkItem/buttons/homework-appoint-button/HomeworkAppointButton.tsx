import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { Homework } from '../../../../../interfaces/Homework';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { setHomeworkForAppointment } from '../../../../../store/homework-page/homework-appoint-modal/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';

import HomeworkAppointModal from './HomeworkAppointModal';

interface Props {
  hw: Homework;
}

function HomeworkAppointButton(props: Props) {
  const { hw } = props;
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const appointOnClick = () => {
    dispatch(setHomeworkForAppointment(hw));
    dispatch(toggleModalWindow(ChildIndex.AppointHomework));
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
