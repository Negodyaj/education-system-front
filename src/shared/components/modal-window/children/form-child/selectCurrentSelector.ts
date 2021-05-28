import { CurrentLesson } from '../../../../../components/group-page/lesson-list-component/lesson-list-table/LessonsTableByGroup';
import { ChildIndex } from '../../../../../enums/ChildIndex';
import { Homework } from '../../../../../interfaces/Homework';
import { TagInput } from '../../../../../interfaces/TagInput';
import { IRootState } from '../../../../../store';
import { currentLessonSelector } from '../../../../../store/group-page/lesson/selector';
import {
  homeworkAddDefaultValueSelector,
  homeworkForUpdateSelector,
} from '../../../../../store/homework-page/add-homework-modal/selector';
import { homeworkCloneDefaultValueSelector } from '../../../../../store/homework-page/clone-homework-modal/selector';
import { getDefaultTagSelector } from '../../../../../store/tags-page/selector';

export type Selectors = CurrentLesson | Homework | TagInput | {};

export function getCurrentSelector(
  key: ChildIndex
): (state: IRootState) => Selectors {
  switch (key) {
    case ChildIndex.UpdateLesson:
      return currentLessonSelector;
    case ChildIndex.EditHomework:
      return homeworkForUpdateSelector;
    case ChildIndex.AddHomework:
      return homeworkAddDefaultValueSelector;
    case ChildIndex.CloneHomework:
      return homeworkCloneDefaultValueSelector;
    case ChildIndex.AddTag:
      return getDefaultTagSelector;

    default:
      return (state: IRootState) => ({});
  }
}
