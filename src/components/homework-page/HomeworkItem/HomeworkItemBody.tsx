import React, { useState } from 'react';

import { Homework } from '../../../interfaces/Homework';
import {
  HomeworkDescription,
  HomeworkItem,
  HomeworkItemHeader,
  HomeworkName,
  HomeworkProp,
  HomeworkThemeName,
} from '../styled-components/consts';

import HomeworkButtonsCell, {
  HomeworkButtonsCellOptions,
} from './HomeworkButtonsCell';
import HomeworkItemName from './HomeworkItemName';
import IsOptional from './IsOptional';
import { LinkDetector } from './LinkDetector';

const HomeworkItemBody = (props: {
  hw: Homework;
  buttons: HomeworkButtonsCellOptions;
}) => {
  const { hw, buttons } = props;
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);
  const toggleDescriptionVisibility = () => {
    setDescriptionVisibility(!descriptionVisibility);
  };

  return (
    <HomeworkItem>
      <HomeworkItemHeader
        elementVisibility={descriptionVisibility}
        onClick={toggleDescriptionVisibility}>
        <HomeworkItemName hw={hw} />
        <HomeworkThemeName />
        <IsOptional hw={hw} />
        <HomeworkButtonsCell hw={hw} buttons={buttons} />
      </HomeworkItemHeader>
      <HomeworkDescription>
        <LinkDetector hw={hw} />
      </HomeworkDescription>
    </HomeworkItem>
  );
};

export default React.memo(HomeworkItemBody);
