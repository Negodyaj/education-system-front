import React from 'react';

import { PageTitle } from '../../shared/styled-components/consts';
import { Homework } from '../../interfaces/Homework';
import { IndexedObj } from '../../interfaces/IndexedObj';

import AddButton from './buttons/HomeworkAddButton';
import { HomeworkButtonsCellOptions } from './HomeworkItem/HomeworkButtonsCell';
import HomeworkSelector from './homework-selector/HomeworkSelector';
import {
  HomeworkPageContainer,
  HomeworkPageHeader,
} from './styled-components/consts';

export interface HomeworkPageOptions {
  readonly addButton: boolean;
  readonly homeworkButtonsCell: IndexedObj<HomeworkButtonsCellOptions>;
  homeworkList: IndexedObj<IndexedObj<Homework[]>>;
}

const HomeworkPageCore = (props: { settings: HomeworkPageOptions }) => {
  const { settings } = props;

  return (
    <HomeworkPageContainer>
      <HomeworkPageHeader>
        <PageTitle>Домашние задания</PageTitle>
        <AddButton isTurnedOn={settings.addButton} />
      </HomeworkPageHeader>
      <HomeworkSelector />
    </HomeworkPageContainer>
  );
};

export default React.memo(HomeworkPageCore);
