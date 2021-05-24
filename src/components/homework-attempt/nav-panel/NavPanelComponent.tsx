import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Attempt } from '../../../interfaces/Attempt';
import { homeworkUrl } from '../../../shared/consts';
import { setCurrentAttempt } from '../../../store/homework-attempt/action-creators';
import { Author, NavPanel } from '../styledComponents';

const NavPanelComponent = (props: { attemptList: Attempt[] | undefined }) => {
  const { attemptList } = props;
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const history = useHistory();
  const authorOnClick = (currentAttemptArg: Attempt) => {
    dispatch(setCurrentAttempt(currentAttemptArg));
    history.replace(`/${homeworkUrl}/${hwId}/attempts/${currentAttemptArg.id}`);
  };

  return (
    <NavPanel>
      {attemptList?.length &&
        attemptList.map((attempt) => (
          <Author
            onClick={() => authorOnClick(attempt)}
            key={attempt.author.id}>
            {attempt.author.firstName} {attempt.author.lastName}
          </Author>
        ))}
    </NavPanel>
  );
};

export default React.memo(NavPanelComponent);
