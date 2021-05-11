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

function HomeworkItemBody(props: {
  hw: Homework;
  buttons: HomeworkButtonsCellOptions;
}) {
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
        <HomeworkName>{hw.name}</HomeworkName>
        <HomeworkThemeName>
          {hw.themes.map((theme) => (
            <HomeworkProp key={theme.id}>{theme.name}</HomeworkProp>
          ))}
        </HomeworkThemeName>
        <HomeworkProp>
          {hw.isOptional ? 'без проверки' : 'с проверкой'}
        </HomeworkProp>
        <HomeworkButtonsCell hw={hw} buttons={buttons} />
      </HomeworkItemHeader>
      <HomeworkDescription>
        {hw.description ? hw.description : 'нет описания'}
      </HomeworkDescription>
    </HomeworkItem>
  );
}

export default HomeworkItemBody;
