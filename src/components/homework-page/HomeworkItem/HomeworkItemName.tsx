import React from 'react';

import { Homework } from '../../../interfaces/Homework';
import { HomeworkName, HomeworkProp } from '../styled-components/consts';

const HomeworkItemName = (props: { hw: Homework }) => {
  const { hw } = props;

  return (
    <HomeworkName>
      {hw.themes &&
        hw.themes.map((theme) => (
          <HomeworkProp key={theme.id}>{theme.name}</HomeworkProp>
        ))}
      {!hw.themes?.length && 'без названия'}
    </HomeworkName>
  );
};

export default React.memo(HomeworkItemName);
