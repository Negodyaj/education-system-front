import { Homework } from '../../interfaces/Homework';
import { HomeworksByGroup } from '../../store/state';
import { homeworkList } from '../tmp-mock-data/hw/homeworkList';

const INIT_HOMEWORK: Homework = { ...homeworkList[0] };

export const convertHomeworkListForTeacherMode = (
  actionPayload: Homework[]
): HomeworksByGroup => {
  let previousGroupId: number | undefined;
  const result: HomeworksByGroup = {};
  actionPayload.map((hw) => {
    const index = `${hw.group.course.name} ${hw.group.startDate}`;

    if (hw.group.id === previousGroupId) {
      result[index].push(hw);
    } else {
      if (result[index] === undefined) {
        result[index] = [...[INIT_HOMEWORK]];
      }

      if (result[index].length === 1) result[index][0] = hw;
      else result[index].push(hw);
    }

    previousGroupId = hw.group.id;

    return hw;
  });

  return result;
};
