import React, { useState } from 'react';

import { Homework } from '../../../interfaces/Homework';
import {
  HomeworkDescription,
  HomeworkItem,
  HomeworkItemHeader,
  HomeworkThemeName,
} from '../styled-components/consts';
import { LinkDetector } from '../../../shared/components/link-detector/LinkDetector';

import HomeworkButtonsCell, {
  HomeworkButtonsCellOptions,
} from './HomeworkButtonsCell';
import HomeworkItemName from './HomeworkItemName';
import IsOptional from './IsOptional';

const HomeworkItemBody = (props: {
  hw: Homework;
  buttons: HomeworkButtonsCellOptions;
}) => {
  const { hw, buttons } = props;
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);
  const stringForDetecting = hw.description ? hw.description : 'нет описания';
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
        <LinkDetector stringForDetecting={stringForDetecting} />
      </HomeworkDescription>
    </HomeworkItem>
  );
};

export default React.memo(HomeworkItemBody);
