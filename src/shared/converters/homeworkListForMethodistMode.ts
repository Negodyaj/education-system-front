import { Homework } from '../../interfaces/Homework';
import { HomeworksByCourse } from '../../store/state';
import { homeworkList } from '../tmp-mock-data/hw/homeworkList';

const INIT_HOMEWORK: Homework = { ...homeworkList[0] };

export const convertHomeworkListForMethodistMode = (
  actionPayload: Homework[]
): HomeworksByCourse => {
  let previousCourseName: string | undefined;
  const result: HomeworksByCourse = {};
  actionPayload.map((hw) => {
    if (hw.group.course.name === previousCourseName) {
      result[hw.group.course.name].push(hw);
    } else {
      if (result[hw.group.course.name] === undefined) {
        result[hw.group.course.name] = [...[INIT_HOMEWORK]];
      }

      if (result[hw.group.course.name].length === 1)
        result[hw.group.course.name][0] = hw;
      else result[hw.group.course.name].push(hw);
    }

    previousCourseName = hw.group.course.name;

    return hw;
  });

  return result;
};
