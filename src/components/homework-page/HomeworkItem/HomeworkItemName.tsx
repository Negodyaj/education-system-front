import React from 'react';

import { Homework } from '../../../interfaces/Homework';
import { HomeworkName, HomeworkProp } from '../styled-components/consts';

const HomeworkItemName = (props: { hw: Homework }) => {
  const { hw } = props;

  return (
    <HomeworkProp>
      {hw.themes &&
        hw.themes.map((theme) => (
          <HomeworkName key={theme.id}>{theme.name}</HomeworkName>
        ))}
      <HomeworkName>{!hw.themes?.length && 'без названия'}</HomeworkName>
    </HomeworkProp>
  );
};

export default React.memo(HomeworkItemName);
