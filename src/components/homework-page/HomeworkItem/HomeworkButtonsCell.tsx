import React from 'react';

import { Homework } from '../../../interfaces/Homework';
import { ButtonsCell } from '../../../shared/styled-components/consts';

import HomeworkAppointButton from './buttons/homework-appoint-button/HomeworkAppointButton';
import HomeworkDeleteButton from './buttons/homework-delete-button/HomeworkDeleteButton';
import HomeworkAttemptButton from './buttons/HomeworkAttemptButton';
import HomeworkCheckButton from './buttons/HomeworkCheckButton';
import HomeworkCloneButton from './buttons/HomeworkCloneButton';
import HomeworkEditButton from './buttons/HomeworkEditButton';

export interface HomeworkButtonsCellOptions {
  readonly appointButton?: boolean;
  readonly cancelAttemptButton?: boolean;
  readonly cloneButton?: boolean;
  readonly deleteButton?: boolean;
  readonly editButton?: boolean;
  readonly checkButton?: boolean;
  attemptButton?: boolean;
}

function HomeworkButtonsCell(props: {
  hw: Homework;
  buttons: HomeworkButtonsCellOptions;
}) {
  const { hw, buttons } = props;

  return (
    <ButtonsCell onClick={(e) => e.stopPropagation()}>
      {buttons.cloneButton && <HomeworkCloneButton />}
      {buttons.editButton && <HomeworkEditButton />}
      {buttons.deleteButton && <HomeworkDeleteButton homeworkId={hw.id} />}
      {buttons.checkButton && <HomeworkCheckButton hw={hw} />}
      {buttons.appointButton && <HomeworkAppointButton hw={hw} />}
      {buttons.attemptButton && !hw.isOptional && <HomeworkAttemptButton />}
    </ButtonsCell>
  );
}

export default HomeworkButtonsCell;
