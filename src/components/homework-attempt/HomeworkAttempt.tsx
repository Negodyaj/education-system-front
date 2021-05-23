import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Attempt } from '../../interfaces/Attempt';
import CustomMultiSelect from '../../shared/components/multi-select/CustomMultiSelect';
import { homeworkUrl } from '../../shared/consts';
import { convertAllGroupsInCollegeToSelectItems } from '../../shared/converters/allGroupsInCollegeToSelecItems';
import { PageTitle } from '../../shared/styled-components/consts';
import { IRootState } from '../../store';
import { setCurrentAttempt } from '../../store/homework-attempt/action-creators';
import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';

import {
  AttemptCheckingContainer,
  Author,
  Content,
  Data,
  Description,
  GroupName,
  Header,
  NavPanel,
  Title,
} from './styledComponents';

function HomeworkAttempt() {
  const {
    attemptList,
    currentAttempt,
    currentGroup,
    currentHomework,
    allGroupsInCollege,
  } = useSelector((state: IRootState) => state.homeworkAttempt);
  const history = useHistory();
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    !attemptList?.length &&
      dispatch(getAttemptListToCheck(hwId || '', attemptId));
  }, []);

  const authorOnClick = (currentAttemptArg: Attempt) => {
    dispatch(setCurrentAttempt(currentAttemptArg));
    history.replace(`/${homeworkUrl}/${hwId}/attempts/${currentAttemptArg.id}`);
  };

  return (
    <>
      <Header>
        <PageTitle>Проверка ответов</PageTitle>
        <GroupName>
          <Title>Группа:</Title>
          <CustomMultiSelect
            selectType="single"
            options={convertAllGroupsInCollegeToSelectItems(allGroupsInCollege)}
          />
        </GroupName>
      </Header>
      <Description>
        <Title>Домашняя работа:</Title>
        <Data>{currentHomework?.description}</Data>
      </Description>
      <AttemptCheckingContainer>
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
        <Content>{currentAttempt?.comment}</Content>
      </AttemptCheckingContainer>
    </>
  );
}
export default HomeworkAttempt;
