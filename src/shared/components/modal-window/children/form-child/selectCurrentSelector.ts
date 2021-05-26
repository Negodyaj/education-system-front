import { ChildIndex } from '../../../../../enums/ChildIndex';
import { IRootState } from '../../../../../store';
import { currentLessonSelector } from '../../../../../store/group-page/lesson/selector';

export function getCurrentSelector(key: ChildIndex) {
  switch (key) {
    case ChildIndex.UpdateLesson:
      return currentLessonSelector;
  }

  return (state: IRootState) => undefined;
}
