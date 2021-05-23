import React from 'react';
import { useSelector } from 'react-redux';

import { Role } from '../../../enums/role';
import CustomMultiSelect from '../../../shared/components/multi-select/CustomMultiSelect';
import { convertAllGroupsInCollegeToSelectItems } from '../../../shared/converters/allGroupsInCollegeToSelecItems';
import { PageTitle } from '../../../shared/styled-components/consts';
import { IRootState } from '../../../store';
import { GroupName, Header, Title } from '../styledComponents';

export const HeaderComponent = () => {
  const { homeworkAttempt, roleSelector } = useSelector(
    (state: IRootState) => state
  );
  const { currentUserRoleId } = roleSelector;
  const { allGroupsInCollege } = homeworkAttempt;

  return (
    <Header>
      <PageTitle>
        {currentUserRoleId === Role.Student
          ? 'Выполнение домашнего задания'
          : 'Проверка ответов'}
      </PageTitle>
      {currentUserRoleId !== Role.Student && (
        <GroupName>
          <Title>Группа:</Title>
          <CustomMultiSelect
            selectType="single"
            options={convertAllGroupsInCollegeToSelectItems(allGroupsInCollege)}
          />
        </GroupName>
      )}
    </Header>
  );
};
