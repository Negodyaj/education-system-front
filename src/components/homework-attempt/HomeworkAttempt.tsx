import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAttemptListToCheck } from '../../store/homework-attempt/thunk';
import { IRootState } from '../../store';
import { PageTitle } from '../../shared/styled-components/consts';
import CustomMultiSelect from '../../shared/components/multi-select/CustomMultiSelect';
import { convertAllGroupsInCollegeToSelectItems } from '../../shared/converters/allGroupsInCollegeToSelecItems';

import NavPanelComponent from './nav-panel/NavPanelComponent';
import {
  AttemptCheckingContainer,
  Content,
  Data,
  Description,
  GroupName,
  Header,
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
  const dispatch = useDispatch();
  const { hwId } = useParams<{ hwId?: string }>();
  const { attemptId } = useParams<{ attemptId?: string }>();
  useEffect(() => {
    !attemptList?.length &&
      dispatch(getAttemptListToCheck(hwId || '', attemptId));
  }, []);

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
        <NavPanelComponent attemptList={attemptList} />
        <Content>
          {currentAttempt ? currentAttempt.comment : 'нет ответов'}
        </Content>
      </AttemptCheckingContainer>
    </>
  );
}
export default HomeworkAttempt;
