import React from 'react';
import { useSelector } from 'react-redux';

import { Role } from '../../../enums/role';
import { Homework } from '../../../interfaces/Homework';
import { IRootState } from '../../../store';
import { HomeworkProp } from '../styled-components/consts';

const IsOptional = (props: { hw: Homework }) => {
  const { hw } = props;
  const appState = useSelector((state: IRootState) => state);
  const { currentUserRoleId } = appState.roleSelector;

  return currentUserRoleId !== Role.Student ? (
    <HomeworkProp>
      {hw.isOptional ? 'без проверки' : 'с проверкой'}
    </HomeworkProp>
  ) : (
    <div> </div>
  );
};

export default React.memo(IsOptional);
