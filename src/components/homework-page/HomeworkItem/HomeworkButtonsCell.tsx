import React from 'react';

import { Homework } from '../../../interfaces/Homework';
import { ButtonsCell } from '../../../shared/styled-components/consts';

import HomeworkAppointButton from './buttons/homework-appoint-button/HomeworkAppointButton';
import HomeworkDeleteButton from './buttons/homework-delete-button/HomeworkDeleteButton';
import HomeworkAttemptButton from './buttons/HomeworkAttemptButton';
import HomeworkCheckButton from './buttons/HomeworkCheckButton';
import HomeworkCloneButton from './buttons/HomeworkCloneButton';
import HomeworkEditAttemptButton from './buttons/HomeworkEditAttemptButton';
import HomeworkEditButton from './buttons/HomeworkEditButton';
import HomeworkViewButton from './buttons/HomeworkViewButton';

export interface HomeworkButtonsCellOptions {
  readonly appointButton?: boolean;
  readonly cancelAttemptButton?: boolean;
  readonly cloneButton?: boolean;
  readonly deleteButton?: boolean;
  readonly editButton?: boolean;
  readonly checkButton?: boolean;
  attemptButton?: boolean;
  readonly viewButton?: boolean;
  readonly editAttemptButton?: boolean;
}

function HomeworkButtonsCell(props: {
  hw: Homework;
  buttons: HomeworkButtonsCellOptions;
}) {
  const { hw, buttons } = props;

  return buttons ? (
    <ButtonsCell onClick={(e) => e.stopPropagation()}>
      {buttons.cloneButton && <HomeworkCloneButton hw={hw} />}
      {buttons.editButton && <HomeworkEditButton hw={hw} />}
      {buttons.deleteButton && <HomeworkDeleteButton homeworkId={hw.id} />}
      {buttons.checkButton && <HomeworkCheckButton hw={hw} />}
      {buttons.appointButton && <HomeworkAppointButton hw={hw} />}
      {buttons.attemptButton && !hw.isOptional && (
        <HomeworkAttemptButton hw={hw} />
      )}
      {buttons.viewButton && <HomeworkViewButton hw={hw} />}
      {buttons.editAttemptButton && <HomeworkEditAttemptButton />}
    </ButtonsCell>
  ) : null;
}

export default HomeworkButtonsCell;
