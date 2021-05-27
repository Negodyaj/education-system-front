import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Attempt } from '../../../interfaces/Attempt';
import { homeworkUrl } from '../../../shared/consts';
import { IRootState } from '../../../store';
import { setCurrentAttempt } from '../../../store/homework-attempt/action-creators';
import { currentAuthorIdSelector } from '../../../store/homework-attempt/selector';
import { Author, NavPanel, UserPic } from '../styledComponents';

const NavPanelComponent = (props: { attemptList: Attempt[] | undefined }) => {
  const { attemptList } = props;
  const appState = useSelector((state: IRootState) => state);
  const currentAuthorId = currentAuthorIdSelector(appState);
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const history = useHistory();
  const authorOnClick = (currentAttemptArg: Attempt) => {
    dispatch(setCurrentAttempt(currentAttemptArg));
    history.replace(`/${homeworkUrl}/${hwId}/attempt/${currentAttemptArg.id}`);
  };

  return (
    <NavPanel>
      {attemptList?.length &&
        attemptList.map((attempt) => (
          <Author
            isViewing={attempt.author.id === currentAuthorId}
            onClick={() => authorOnClick(attempt)}
            key={attempt.author.id}>
            <UserPic src={attempt.author.userPic} alt="" />
            {attempt.author.firstName} {attempt.author.lastName}
          </Author>
        ))}
    </NavPanel>
  );
};

export default React.memo(NavPanelComponent);
