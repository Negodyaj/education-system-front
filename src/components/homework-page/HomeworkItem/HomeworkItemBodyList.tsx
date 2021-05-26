import React from 'react';

import { Homework } from '../../../interfaces/Homework';

import { HomeworkButtonsCellOptions } from './HomeworkButtonsCell';
import HomeworkItemBody from './HomeworkItemBody';

const HomeworkItemBodyList = (props: {
  homeworkList: Homework[];
  homeworkButtonsCell: HomeworkButtonsCellOptions;
}) => {
  const { homeworkList, homeworkButtonsCell } = props;

  return (
    <>
      {homeworkList.map((hw) => (
        <HomeworkItemBody hw={hw} buttons={homeworkButtonsCell} key={hw.id} />
      ))}
    </>
  );
};

export default React.memo(HomeworkItemBodyList);
