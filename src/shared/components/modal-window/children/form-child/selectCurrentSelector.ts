import { CurrentLesson } from '../../../../../components/group-page/lesson-list-component/lesson-list-table/LessonsTableByGroup';
import { ChildIndex } from '../../../../../enums/ChildIndex';
import { IRootState } from '../../../../../store';
import { currentLessonSelector } from '../../../../../store/group-page/lesson/selector';

export type Selectors = CurrentLesson | {};

export function getCurrentSelector(
  key: ChildIndex
): (state: IRootState) => Selectors {
  switch (key) {
    case ChildIndex.UpdateLesson:
      return currentLessonSelector;

    default:
      return (state: IRootState) => ({});
  }
}
